import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../core/services/users.service';
import {DocumentsService} from '../../core/services/documents.service';
import {CommonModule, DatePipe} from '@angular/common';
import {AuthService} from '../../core/services/auth.service';
import {Document} from '../../core/models/document.model';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  documents: Document[] = [];
  tree: Document[] = [];
  users: any[] = [];
  currentPath: Document[] = [];
  currentFolder: Document | null = null;
  currentView: 'grid' | 'list' = 'list';
  isLoading = false;
  showNewFolderModal = false;
  showNewFileModal = false;

  newFolderForm = new FormGroup({
    folderName: new FormControl('', [Validators.required])
  });

  newFileForm = new FormGroup({
    fileName: new FormControl('', [Validators.required]),
    fileContent: new FormControl('')
  });

  constructor(
    private usersService: UsersService,
    private documentsService: DocumentsService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;

    this.usersService.getUsers().subscribe((users) => {
      this.users = users;
    });

    this.documentsService.getDocuments().subscribe({
      next: (documents) => {
        this.documents = documents;
        this.tree = this.buildTree(this.documents, null);
        this.navigateToFolder(null); // Racine par défaut
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des documents', error);
        this.isLoading = false;
      }
    });
  }

  buildTree(items: Document[], parentId: number | null): Document[] {
    return items
      .filter(item => item.parent_folder_id === parentId && !item.is_deleted)
      .map(item => ({
        ...item,
        children: this.buildTree(items, item.id), // Appel récursif pour les enfants
        // Ajouter les informations sur le propriétaire et le dernier modificateur
        owner_username: this.getUsernameById(item.owner_id),
        last_modified_by_username: item.last_modified_by ? this.getUsernameById(item.last_modified_by) : ''
      }));
  }

  getUsernameById(userId: number): string {
    const user = this.users.find(u => u.id === userId);
    return user ? user.username : 'Utilisateur inconnu';
  }

  navigateToFolder(folder: Document | null) {
    this.currentFolder = folder;

    // Construire le chemin de navigation
    if (folder === null) {
      // Racine
      this.currentPath = [];
    } else {
      // Construire le chemin en remontant les parents
      this.buildPath(folder);
    }

    // Filtrer les documents à afficher dans le dossier actuel
    this.filterCurrentFolderContent();
  }

  buildPath(folder: Document) {
    this.currentPath = [];
    let currentFolder = folder;

    // Ajouter le dossier actuel
    this.currentPath.unshift(currentFolder);

    // Remonter les parents
    while (currentFolder.parent_folder_id !== null) {
      const parentFolder = this.documents.find(d => d.id === currentFolder.parent_folder_id);
      if (parentFolder) {
        this.currentPath.unshift(parentFolder);
        currentFolder = parentFolder;
      } else {
        break;
      }
    }
  }

  filterCurrentFolderContent() {
    const parentId = this.currentFolder ? this.currentFolder.id : null;
    return this.documents.filter(doc =>
      doc.parent_folder_id === parentId &&
      !doc.is_deleted
    );
  }

  getFileIcon(document: Document): string {
    if (document.is_folder) {
      return 'folder';
    }

    // Déterminer l'icône en fonction du type de fichier
    if (document.file_type) {
      if (document.file_type.includes('image')) {
        return 'image';
      } else if (document.file_type.includes('pdf')) {
        return 'pdf';
      } else if (document.file_type.includes('text/markdown') || document.title.endsWith('.md')) {
        return 'markdown';
      } else if (document.file_type.includes('text')) {
        return 'text';
      }
    }

    // Par défaut
    return 'document';
  }

  formatFileSize(bytes?: number): string {
    if (!bytes) return '0 B';

    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size.toFixed(1)} ${units[unitIndex]}`;
  }

  openDocument(document: Document) {
    if (document.is_folder) {
      this.navigateToFolder(document);
    } else {
      // Ouvrir le document pour édition (à implémenter)
      console.log('Ouverture du document', document);
    }
  }

  toggleView() {
    this.currentView = this.currentView === 'list' ? 'grid' : 'list';
  }

  openNewFolderModal() {
    this.showNewFolderModal = true;
    this.newFolderForm.reset();
  }

  closeNewFolderModal() {
    this.showNewFolderModal = false;
  }

  createNewFolder() {
    if (this.newFolderForm.valid) {
      const folderName = this.newFolderForm.get('folderName')?.value;
      const parentId = this.currentFolder?.id;

      this.isLoading = true;
      this.documentsService.createFolder(folderName!, parentId).subscribe({
        next: (newFolder) => {
          this.documents.push(newFolder);
          this.tree = this.buildTree(this.documents, null);
          this.filterCurrentFolderContent();
          this.closeNewFolderModal();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erreur lors de la création du dossier', error);
          this.isLoading = false;
        }
      });
    }
  }

  openNewFileModal() {
    this.showNewFileModal = true;
    this.newFileForm.reset();
  }

  closeNewFileModal() {
    this.showNewFileModal = false;
  }

  createNewFile() {
    if (this.newFileForm.valid) {
      const fileName = this.newFileForm.get('fileName')?.value;
      const fileContent = this.newFileForm.get('fileContent')?.value || '';
      const parentId = this.currentFolder?.id;

      this.isLoading = true;
      this.documentsService.createDocument(fileName!, fileContent, parentId).subscribe({
        next: (newFile) => {
          this.documents.push(newFile);
          this.filterCurrentFolderContent();
          this.closeNewFileModal();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erreur lors de la création du fichier', error);
          this.isLoading = false;
        }
      });
    }
  }

}
