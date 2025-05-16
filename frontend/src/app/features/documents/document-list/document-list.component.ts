import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { DocumentService } from '../../../core/services/document.service';
import { AuthService } from '../../../core/services/auth.service';
import { Document } from '../../../core/models/document.model';

@Component({
  selector: 'app-document-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  // Signaux pour l'état du composant
  documents = signal<Document[]>([]);
  filteredDocuments = signal<Document[]>([]);
  currentFolder = signal<Document | null>(null);
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);

  // Options de filtrage et de tri
  searchTerm = '';
  sortField: 'title' | 'updated_at' | 'owner' = 'updated_at';
  sortDirection: 'asc' | 'desc' = 'desc';
  filterType: 'all' | 'folders' | 'documents' | 'owned' | 'shared' = 'all';

  constructor(
    private documentService: DocumentService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadDocuments();

    // Vérifier s'il y a un paramètre de dossier dans l'URL
    this.route.queryParams.subscribe(params => {
      if (params['folder']) {
        const folderId = Number(params['folder']);
        if (!isNaN(folderId)) {
          // Attendre que les documents soient chargés avant d'ouvrir le dossier
          this.documentService.getDocumentById(folderId).subscribe(folder => {
            if (folder && folder.is_folder) {
              this.openFolder(folder);
            }
          });
        }
      }
    });
  }

  /**
   * Charge la liste des documents
   */
  loadDocuments(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.documentService.getAllDocuments().subscribe({
      next: (documents) => {
        this.documents.set(documents);
        this.applyFiltersAndSort();
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des documents:', err);
        this.error.set('Impossible de charger les documents. Veuillez réessayer plus tard.');
        this.isLoading.set(false);
      }
    });
  }

  /**
   * Applique les filtres et le tri aux documents
   */
  applyFiltersAndSort(): void {
    let filtered = this.documents();

    // Filtrer par dossier parent
    if (this.currentFolder()) {
      filtered = filtered.filter(doc => doc.parent_folder_id === this.currentFolder()?.id);
    } else {
      filtered = filtered.filter(doc => !doc.parent_folder_id);
    }

    // Filtrer par terme de recherche
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(doc =>
        doc.title.toLowerCase().includes(term)
      );
    }

    // Filtrer par type
    switch (this.filterType) {
      case 'folders':
        filtered = filtered.filter(doc => doc.is_folder);
        break;
      case 'documents':
        filtered = filtered.filter(doc => !doc.is_folder);
        break;
      case 'owned':
        filtered = filtered.filter(doc => doc.owner_id === this.getCurrentUserId());
        break;
      case 'shared':
        filtered = filtered.filter(doc => doc.owner_id !== this.getCurrentUserId());
        break;
    }

    // Trier les documents
    filtered = this.sortDocuments(filtered);

    this.filteredDocuments.set(filtered);
  }

  /**
   * Trie les documents selon les critères sélectionnés
   * @param docs Documents à trier
   * @returns Documents triés
   */
  sortDocuments(docs: Document[]): Document[] {
    return [...docs].sort((a, b) => {
      // Toujours afficher les dossiers avant les fichiers
      if (a.is_folder && !b.is_folder) return -1;
      if (!a.is_folder && b.is_folder) return 1;

      // Appliquer le tri selon le champ sélectionné
      let comparison = 0;

      switch (this.sortField) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'updated_at':
          const dateA = a.updated_at ? new Date(a.updated_at).getTime() : 0;
          const dateB = b.updated_at ? new Date(b.updated_at).getTime() : 0;
          comparison = dateA - dateB;
          break;
        case 'owner':
          const modifierA = a.last_modifier?.username || a.owner?.username || '';
          const modifierB = b.last_modifier?.username || b.owner?.username || '';
          comparison = modifierA.localeCompare(modifierB);
          break;
      }

      // Appliquer la direction du tri
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }

  /**
   * Change le dossier courant
   * @param folder Dossier à ouvrir
   */
  openFolder(folder: Document): void {
    if (!folder.is_folder) return;

    this.currentFolder.set(folder);
    this.applyFiltersAndSort();
  }

  /**
   * Remonte au dossier parent
   */
  navigateUp(): void {
    if (!this.currentFolder()) return;

    const parentId = this.currentFolder()?.parent_folder_id;

    if (parentId) {
      const parentFolder = this.documents().find(doc => doc.id === parentId);
      this.currentFolder.set(parentFolder || null);
    } else {
      this.currentFolder.set(null);
    }

    this.applyFiltersAndSort();
  }

  /**
   * Ouvre un document
   * @param document Document à ouvrir
   */
  openDocument(document: Document): void {
    if (document.is_folder) {
      this.openFolder(document);
    } else {
      // Utiliser le document-viewer qui déterminera le bon affichage en fonction du type
      this.router.navigate(['/documents', document.id]);
    }
  }

  /**
   * Crée un nouveau dossier
   */
  createFolder(): void {
    const folderName = prompt('Nom du dossier:');
    if (!folderName) return;

    const newFolder = {
      title: folderName,
      isFolder: true,
      parentFolderId: this.currentFolder()?.id
    };

    this.documentService.createDocument(newFolder).subscribe({
      next: (folder) => {
        this.loadDocuments();
      },
      error: (err) => {
        console.error('Erreur lors de la création du dossier:', err);
        alert('Impossible de créer le dossier. Veuillez réessayer plus tard.');
      }
    });
  }

  /**
   * Crée un nouveau document
   */
  createDocument(): void {
    const documentName = prompt('Nom du document:');
    if (!documentName) return;

    const newDocument = {
      title: documentName,
      content: '',
      parentFolderId: this.currentFolder()?.id
    };

    this.documentService.createDocument(newDocument).subscribe({
      next: (document) => {
        // Mettre à jour la liste des documents avant de naviguer
        this.loadDocuments();
        // Naviguer vers l'éditeur de document (pour les nouveaux documents texte)
        this.router.navigate(['/documents/edit', document.id]);
      },
      error: (err) => {
        console.error('Erreur lors de la création du document:', err);
        alert('Impossible de créer le document. Veuillez réessayer plus tard.');
      }
    });
  }

  /**
   * Supprime un document ou un dossier
   * @param document Document à supprimer
   * @param event Événement du clic
   */
  deleteDocument(document: Document, event: Event): void {
    event.stopPropagation();

    const isFolder = document.is_folder;
    const confirmation = confirm(`Êtes-vous sûr de vouloir supprimer ce ${isFolder ? 'dossier' : 'document'} : "${document.title}" ?`);

    if (!confirmation) return;

    this.documentService.deleteDocument(document.id).subscribe({
      next: () => {
        this.loadDocuments();
      },
      error: (err) => {
        console.error('Erreur lors de la suppression:', err);
        alert(`Impossible de supprimer le ${isFolder ? 'dossier' : 'document'}. Veuillez réessayer plus tard.`);
      }
    });
  }

  /**
   * Récupère l'ID de l'utilisateur courant
   * @returns ID de l'utilisateur
   */
  getCurrentUserId(): number {
    const user = this.authService.currentUser();
    return user ? user.id : 0;
  }

  /**
   * Formate une date pour l'affichage
   * @param dateString Date au format ISO
   * @returns Date formatée
   */
  formatDate(dateString?: string): string {
    if (!dateString) return 'Jamais';

    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
