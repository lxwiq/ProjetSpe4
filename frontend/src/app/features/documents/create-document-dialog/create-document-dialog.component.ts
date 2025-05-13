import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocumentsService } from '../../../core/services/documents.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-document-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-document-dialog.component.html',
  styleUrls: ['./create-document-dialog.component.css']
})
export class CreateDocumentDialogComponent {
  @Input() parentFolderId?: number;
  @Output() close = new EventEmitter<void>();
  @Output() documentCreated = new EventEmitter<any>();

  title: string = '';
  isFolder: boolean = false;
  isLoading: boolean = false;
  error: string = '';

  constructor(
    private documentsService: DocumentsService,
    private router: Router
  ) {}

  createDocument(): void {
    if (!this.title.trim()) {
      this.error = 'Le titre est requis';
      return;
    }

    this.isLoading = true;
    this.error = '';

    if (this.isFolder) {
      this.documentsService.createFolder(this.title, this.parentFolderId).subscribe({
        next: (document) => {
          this.isLoading = false;
          this.documentCreated.emit(document);
          this.close.emit();
        },
        error: (error) => {
          this.isLoading = false;
          this.error = 'Erreur lors de la création du dossier';
          console.error('Error creating folder:', error);
        }
      });
    } else {
      // Créer un document vide et rediriger vers l'éditeur
      this.documentsService.createDocument(this.title, '', this.parentFolderId).subscribe({
        next: (document) => {
          this.isLoading = false;
          this.documentCreated.emit(document);
          this.close.emit();
          // Rediriger vers l'éditeur de document
          this.router.navigate(['/documents', document.id]);
        },
        error: (error) => {
          this.isLoading = false;
          this.error = 'Erreur lors de la création du document';
          console.error('Error creating document:', error);
        }
      });
    }
  }

  cancel(): void {
    this.close.emit();
  }
}
