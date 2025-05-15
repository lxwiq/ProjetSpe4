import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Document, ActiveDocumentUser } from '../../../../core/models/document.model';

@Component({
  selector: 'app-active-documents',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './active-documents.component.html'
})
export class ActiveDocumentsComponent {
  @Input() activeDocuments: { document: Document, users: ActiveDocumentUser[] }[] = [];
}
