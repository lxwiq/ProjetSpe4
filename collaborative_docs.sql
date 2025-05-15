-- Script de création de la base de données pour l'application collaborative de documents
-- Base de données PostgreSQL

-- Suppression des tables existantes (si nécessaire)
DROP TABLE IF EXISTS call_participants CASCADE;
DROP TABLE IF EXISTS calls CASCADE;
DROP TABLE IF EXISTS document_invitations CASCADE;
DROP TABLE IF EXISTS document_versions CASCADE;
DROP TABLE IF EXISTS documents CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Création de la table users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    profile_picture VARCHAR(255),
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    two_factor_secret VARCHAR(255),
    is_admin BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE,
    login_attempts INTEGER DEFAULT 0,
    locked_until TIMESTAMP WITH TIME ZONE
);

-- Création de la table documents
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    file_path VARCHAR(500),
    file_type VARCHAR(50),
    file_size BIGINT,
    owner_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    parent_folder_id INTEGER REFERENCES documents(id) ON DELETE CASCADE,
    is_folder BOOLEAN DEFAULT FALSE,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_modified_by INTEGER REFERENCES users(id),
    auto_save_interval INTEGER DEFAULT 30 -- en secondes
);

-- Création de la table document_versions (historique des modifications)
CREATE TABLE document_versions (
    id SERIAL PRIMARY KEY,
    document_id INTEGER NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    version_number INTEGER NOT NULL,
    content TEXT,
    modified_by INTEGER NOT NULL REFERENCES users(id),
    modification_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    change_summary TEXT,
    UNIQUE(document_id, version_number)
);

-- Création de la table document_invitations (permissions et invitations)
CREATE TABLE document_invitations (
    id SERIAL PRIMARY KEY,
    document_id INTEGER NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    permission_level VARCHAR(20) NOT NULL CHECK (permission_level IN ('read', 'write', 'admin')),
    invited_by INTEGER REFERENCES users(id),
    invitation_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    accepted_date TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE,
    UNIQUE(document_id, user_id)
);

-- Création de la table calls (appels audio/vidéo)
CREATE TABLE calls (
    id SERIAL PRIMARY KEY,
    document_id INTEGER NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    initiated_by INTEGER NOT NULL REFERENCES users(id),
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP WITH TIME ZONE,
    call_type VARCHAR(20) NOT NULL CHECK (call_type IN ('audio', 'video')),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'ended', 'failed'))
);

-- Création de la table call_participants
CREATE TABLE call_participants (
    id SERIAL PRIMARY KEY,
    call_id INTEGER NOT NULL REFERENCES calls(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id),
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    left_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE,
    UNIQUE(call_id, user_id)
);

-- Index pour améliorer les performances
CREATE INDEX idx_documents_owner ON documents(owner_id);
CREATE INDEX idx_documents_parent ON documents(parent_folder_id);
CREATE INDEX idx_document_invitations_user ON document_invitations(user_id);
CREATE INDEX idx_document_invitations_document ON document_invitations(document_id);
CREATE INDEX idx_document_versions_document ON document_versions(document_id);
CREATE INDEX idx_calls_document ON calls(document_id);
CREATE INDEX idx_users_email ON users(email);

-- Fonction pour mettre à jour automatiquement le champ updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour mettre à jour updated_at automatiquement
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON documents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Vue pour afficher les documents avec leurs permissions
CREATE VIEW document_permissions AS
SELECT 
    d.id as document_id,
    d.title,
    d.owner_id,
    u1.username as owner_username,
    di.user_id,
    u2.username as user_username,
    di.permission_level,
    di.is_active
FROM documents d
JOIN users u1 ON d.owner_id = u1.id
LEFT JOIN document_invitations di ON d.id = di.document_id
LEFT JOIN users u2 ON di.user_id = u2.id
WHERE d.is_deleted = FALSE;

-- Vue pour l'arborescence des dossiers et fichiers
CREATE VIEW folder_tree AS
WITH RECURSIVE folder_hierarchy AS (
    -- Dossiers racine
    SELECT 
        id,
        title,
        parent_folder_id,
        is_folder,
        owner_id,
        0 as depth,
        ARRAY[id] as path
    FROM documents
    WHERE parent_folder_id IS NULL AND is_deleted = FALSE
    
    UNION ALL
    
    -- Sous-dossiers et fichiers
    SELECT 
        d.id,
        d.title,
        d.parent_folder_id,
        d.is_folder,
        d.owner_id,
        fh.depth + 1,
        fh.path || d.id
    FROM documents d
    JOIN folder_hierarchy fh ON d.parent_folder_id = fh.id
    WHERE d.is_deleted = FALSE
)
SELECT * FROM folder_hierarchy;

-- Fonction pour vérifier les permissions d'un utilisateur sur un document
CREATE OR REPLACE FUNCTION check_user_permission(
    p_user_id INTEGER,
    p_document_id INTEGER
) RETURNS VARCHAR AS $$
DECLARE
    v_permission VARCHAR;
    v_owner_id INTEGER;
BEGIN
    -- Vérifier si l'utilisateur est le propriétaire
    SELECT owner_id INTO v_owner_id FROM documents WHERE id = p_document_id;
    
    IF v_owner_id = p_user_id THEN
        RETURN 'admin';
    END IF;
    
    -- Vérifier les permissions dans document_invitations
    SELECT permission_level INTO v_permission
    FROM document_invitations
    WHERE document_id = p_document_id 
        AND user_id = p_user_id 
        AND is_active = TRUE;
    
    RETURN COALESCE(v_permission, 'none');
END;
$$ LANGUAGE plpgsql;