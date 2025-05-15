import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DocumentService } from '../../../../core/services/document.service';
import { LoggingService } from '../../../../core/services/logging.service';
import { Document } from '../../../../core/models/document.model';

@Component({
  selector: 'app-create-document-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-document-modal.component.html'
})
export class CreateDocumentModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() documentCreated = new EventEmitter<Document>();
  
  private fb = inject(FormBuilder);
  private documentService = inject(DocumentService);
  private logger = inject(LoggingService);
  
  createForm: FormGroup;
  isSubmitting = false;
  error: string | null = null;
  
  constructor() {
    this.createForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      isFolder: [false],
      parentFolderId: [null]
    });
  }
  
  onSubmit(): void {
    if (this.createForm.invalid || this.isSubmitting) {
      return;
    }
    
    this.isSubmitting = true;
    this.error = null;
    
    const formData = this.createForm.value;
    
    this.documentService.createDocument({
      title: formData.title,
      isFolder: formData.isFolder,
      parentFolderId: formData.parentFolderId
    }).subscribe({
      next: (document) => {
        this.logger.info('Document created successfully', {
          component: 'CreateDocumentModalComponent',
          documentId: document.id
        });
        
        this.isSubmitting = false;
        this.documentCreated.emit(document);
      },
      error: (error) => {
        this.logger.error('Failed to create document', {
          component: 'CreateDocumentModalComponent',
          error
        });
        
        this.isSubmitting = false;
        this.error = 'Failed to create document. Please try again.';
      }
    });
  }
  
  closeModal(): void {
    this.close.emit();
  }
}
