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

-- Données de test
-- Les mots de passe utilisent bcrypt avec un coût de 12
-- Mot de passe par défaut pour tous : "password123"

-- Insertion des utilisateurs de test
INSERT INTO users (username, email, password_hash, full_name, is_admin) VALUES
('admin', 'admin@example.com', '$2b$12$c.YZmJL7D7XDC6Y5X8XZx.hMGnFGT5fYjYYKo1oUZ6dK2WfQPyJKu', 'Administrateur Principal', true),
('alice', 'alice@example.com', '$2b$12$c.YZmJL7D7XDC6Y5X8XZx.hMGnFGT5fYjYYKo1oUZ6dK2WfQPyJKu', 'Alice Martin', false),
('bob', 'bob@example.com', '$2b$12$c.YZmJL7D7XDC6Y5X8XZx.hMGnFGT5fYjYYKo1oUZ6dK2WfQPyJKu', 'Bob Dupont', false),
('charlie', 'charlie@example.com', '$2b$12$c.YZmJL7D7XDC6Y5X8XZx.hMGnFGT5fYjYYKo1oUZ6dK2WfQPyJKu', 'Charlie Durand', false),
('david', 'david@example.com', '$2b$12$c.YZmJL7D7XDC6Y5X8XZx.hMGnFGT5fYjYYKo1oUZ6dK2WfQPyJKu', 'David Bernard', false);

-- Insertion des dossiers et documents de test
INSERT INTO documents (title, content, owner_id, is_folder, file_type) VALUES
('Documents partagés', NULL, 1, true, NULL),
('Projets', NULL, 1, true, NULL),
('Archives', NULL, 1, true, NULL);

-- Récupération des IDs des dossiers
WITH folder_ids AS (
    SELECT id, title FROM documents WHERE is_folder = true
)
-- Insertion de documents dans les dossiers
INSERT INTO documents (title, content, owner_id, parent_folder_id, is_folder, file_type, last_modified_by) VALUES
('README.md', '# Documentation du projet\n\nBienvenue dans notre espace collaboratif', 1, 
    (SELECT id FROM folder_ids WHERE title = 'Documents partagés'), false, 'text/markdown', 1),
('Cahier des charges.md', '# Cahier des charges\n\n## Objectifs\n- Collaboration en temps réel\n- Gestion des permissions\n- Historique des versions', 2, 
    (SELECT id FROM folder_ids WHERE title = 'Projets'), false, 'text/markdown', 2),
('Notes de réunion.txt', 'Réunion du 12/05/2025\n\nParticipants: Alice, Bob, Charlie\nSujets abordés:\n- Planning\n- Architecture', 2, 
    (SELECT id FROM folder_ids WHERE title = 'Documents partagés'), false, 'text/plain', 2),
('Rapport Q1 2025.pdf', NULL, 3, 
    (SELECT id FROM folder_ids WHERE title = 'Archives'), false, 'application/pdf', 3);

-- Insertion des invitations/permissions
INSERT INTO document_invitations (document_id, user_id, permission_level, invited_by, accepted_date) VALUES
-- Permissions sur le dossier "Documents partagés"
(1, 2, 'write', 1, CURRENT_TIMESTAMP),
(1, 3, 'write', 1, CURRENT_TIMESTAMP),
(1, 4, 'read', 1, CURRENT_TIMESTAMP),
-- Permissions sur le README
(4, 2, 'write', 1, CURRENT_TIMESTAMP),
(4, 3, 'read', 1, CURRENT_TIMESTAMP),
-- Permissions sur le cahier des charges
(5, 1, 'admin', 2, CURRENT_TIMESTAMP),
(5, 3, 'write', 2, CURRENT_TIMESTAMP),
(5, 4, 'read', 2, CURRENT_TIMESTAMP),
-- Permissions sur les notes de réunion
(6, 1, 'write', 2, CURRENT_TIMESTAMP),
(6, 3, 'write', 2, CURRENT_TIMESTAMP),
(6, 4, 'write', 2, CURRENT_TIMESTAMP);

-- Insertion d'historique de versions
INSERT INTO document_versions (document_id, version_number, content, modified_by, change_summary) VALUES
(5, 1, '# Cahier des charges\n\n## Objectifs\n- Collaboration en temps réel', 2, 'Version initiale'),
(5, 2, '# Cahier des charges\n\n## Objectifs\n- Collaboration en temps réel\n- Gestion des permissions', 2, 'Ajout gestion des permissions'),
(5, 3, '# Cahier des charges\n\n## Objectifs\n- Collaboration en temps réel\n- Gestion des permissions\n- Historique des versions', 3, 'Ajout historique des versions');

-- Insertion d'un appel de test
INSERT INTO calls (document_id, initiated_by, call_type, status, ended_at) VALUES
(5, 2, 'audio', 'ended', CURRENT_TIMESTAMP + INTERVAL '30 minutes');

-- Insertion des participants à l'appel
INSERT INTO call_participants (call_id, user_id, left_at, is_active) VALUES
(1, 2, CURRENT_TIMESTAMP + INTERVAL '30 minutes', false),
(1, 3, CURRENT_TIMESTAMP + INTERVAL '25 minutes', false),
(1, 4, CURRENT_TIMESTAMP + INTERVAL '20 minutes', false);

-- Affichage des comptes créés
SELECT 
    username as "Nom d'utilisateur",
    email as "Email",
    'password123' as "Mot de passe",
    is_admin as "Administrateur",
    full_name as "Nom complet"
FROM users
ORDER BY id;