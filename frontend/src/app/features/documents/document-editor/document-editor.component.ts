import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentsService } from '../../../core/services/documents.service';
import { Document } from '../../../core/models/document.model';
import { DocumentCollaboratorsComponent } from '../document-collaborators/document-collaborators.component';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-document-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, DocumentCollaboratorsComponent],
  templateUrl: './document-editor.component.html',
  styleUrls: ['./document-editor.component.css']
})
export class DocumentEditorComponent implements OnInit, OnDestroy {
  documentId!: number;
  document: Document | null = null;
  content: string = '';
  title: string = '';
  
  isLoading: boolean = false;
  isSaving: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  
  showCollaborators: boolean = false;
  
  private autoSaveInterval: Subscription | null = null;
  private lastSavedContent: string = '';
  private lastSavedTitle: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private documentsService: DocumentsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.documentId = +params['id'];
      this.loadDocument();
    });
  }

  ngOnDestroy(): void {
    if (this.autoSaveInterval) {
      this.autoSaveInterval.unsubscribe();
    }
  }

  loadDocument(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.documentsService.getDocumentById(this.documentId).subscribe({
      next: (document) => {
        this.document = document;
        this.title = document.title;
        this.content = document.content || '';
        this.lastSavedContent = this.content;
        this.lastSavedTitle = this.title;
        
        this.setupAutoSave();
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement du document';
        this.isLoading = false;
        console.error('Error loading document:', error);
      }
    });
  }

  setupAutoSave(): void {
    // Configurer l'auto-sauvegarde toutes les 30 secondes
    if (this.autoSaveInterval) {
      this.autoSaveInterval.unsubscribe();
    }
    
    this.autoSaveInterval = interval(30000).subscribe(() => {
      this.autoSave();
    });
  }

  autoSave(): void {
    // Ne sauvegarder que si le contenu a changé
    if (this.content !== this.lastSavedContent || this.title !== this.lastSavedTitle) {
      this.saveDocument(true);
    }
  }

  saveDocument(isAutoSave: boolean = false): void {
    if (!isAutoSave) {
      this.isSaving = true;
    }
    
    this.errorMessage = '';
    this.successMessage = '';
    
    this.documentsService.updateDocument(this.documentId, {
      title: this.title,
      content: this.content
    }).subscribe({
      next: (updatedDocument) => {
        this.lastSavedContent = this.content;
        this.lastSavedTitle = this.title;
        
        if (!isAutoSave) {
          this.successMessage = 'Document sauvegardé avec succès';
          this.isSaving = false;
        }
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la sauvegarde du document';
        if (!isAutoSave) {
          this.isSaving = false;
        }
        console.error('Error saving document:', error);
      }
    });
  }

  toggleCollaborators(): void {
    this.showCollaborators = !this.showCollaborators;
  }

  goBack(): void {
    this.router.navigate(['/documents']);
  }
}
