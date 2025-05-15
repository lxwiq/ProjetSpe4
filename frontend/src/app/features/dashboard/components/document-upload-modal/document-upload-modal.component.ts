import { Component, EventEmitter, Output, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DocumentService } from '../../../../core/services/document.service';
import { LoggingService } from '../../../../core/services/logging.service';
import { Document } from '../../../../core/models/document.model';
import { FileUploadComponent, FileUploadResult, FileUploadOptions } from '../../../../shared/components/file-upload/file-upload.component';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-document-upload-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FileUploadComponent],
  templateUrl: './document-upload-modal.component.html'
})
export class DocumentUploadModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() documentUploaded = new EventEmitter<Document>();
  @ViewChild(FileUploadComponent) fileUpload!: FileUploadComponent;

  private fb = inject(FormBuilder);
  private documentService = inject(DocumentService);
  private logger = inject(LoggingService);

  uploadForm: FormGroup;
  isSubmitting = signal<boolean>(false);
  error = signal<string | null>(null);
  success = signal<boolean>(false);
  uploadUrl = `${environment.apiUrl}/documents`;
  uploadOptions = signal<FileUploadOptions>({});

  constructor() {
    this.uploadForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      parentFolderId: [null]
    });
  }

  /**
   * Ferme la modal
   */
  closeModal(): void {
    this.close.emit();
  }

  /**
   * Gère la sélection de fichiers
   */
  onFileSelected(files: File[]): void {
    if (files.length > 0) {
      // Utiliser le nom du fichier comme titre par défaut si le champ est vide
      const currentTitle = this.uploadForm.get('title')?.value;
      if (!currentTitle) {
        this.uploadForm.patchValue({
          title: files[0].name
        });
      }
    }
  }

  /**
   * Gère la progression de l'upload
   */
  onUploadProgress(progress: number): void {
    this.logger.info(`Progression de l'upload: ${progress}%`, {
      component: 'DocumentUploadModalComponent'
    });
  }

  /**
   * Gère la fin de l'upload
   */
  onUploadComplete(result: FileUploadResult): void {
    this.isSubmitting.set(false);

    if (result.success && result.data) {
      this.success.set(true);
      this.logger.info('Document uploadé avec succès', {
        component: 'DocumentUploadModalComponent',
        document: result.data
      });

      // Émettre l'événement avec le document créé
      this.documentUploaded.emit(result.data.data);

      // Fermer la modal après un court délai
      setTimeout(() => {
        this.closeModal();
      }, 2000);
    } else {
      this.success.set(false);
      this.error.set(result.error || 'Une erreur est survenue lors de l\'upload du document.');
      this.logger.error('Erreur lors de l\'upload du document', {
        component: 'DocumentUploadModalComponent',
        error: result.error
      });
    }
  }

  /**
   * Soumet le formulaire
   */
  onSubmit(): void {
    if (this.uploadForm.invalid) {
      return;
    }

    this.isSubmitting.set(true);
    this.error.set(null);
    this.success.set(false);

    // Mettre à jour les options d'upload avec les valeurs du formulaire
    this.uploadOptions.set({
      title: this.uploadForm.get('title')?.value,
      parentFolderId: this.uploadForm.get('parentFolderId')?.value
    });

    this.logger.info('Soumission du formulaire d\'upload', {
      component: 'DocumentUploadModalComponent',
      formValues: this.uploadForm.value
    });

    // Déclencher l'upload via le composant FileUploadComponent
    setTimeout(() => {
      if (this.fileUpload) {
        this.fileUpload.uploadFiles();
      } else {
        this.error.set('Erreur: Composant d\'upload non initialisé');
        this.isSubmitting.set(false);
      }
    }, 0);
  }
}
