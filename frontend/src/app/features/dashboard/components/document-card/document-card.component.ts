import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

import { Document } from '../../../../core/models/document.model';

@Component({
  selector: 'app-document-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './document-card.component.html'
})
export class DocumentCardComponent {
  @Input() document!: Document;

  constructor(private router: Router) {}

  /**
   * Format the date to a readable format
   */
  formatDate(date: string | Date | null | undefined): string {
    if (!date) return 'Date inconnue';

    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  /**
   * Get the document icon based on its type
   */
  getDocumentIcon(): string {
    if (this.document.is_folder) {
      return 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z';
    }

    // Check file type if available
    const fileType = this.document.file_type?.toLowerCase() || '';

    if (fileType.includes('image')) {
      return 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z';
    }

    if (fileType.includes('pdf')) {
      return 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z';
    }

    // Default document icon
    return 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z';
  }

  /**
   * Ouvre un dossier ou navigue vers un document
   */
  openDocument(): void {
    if (this.document.is_folder) {
      // Pour les dossiers, naviguer vers la liste des documents avec ce dossier comme dossier courant
      this.router.navigate(['/documents'], { queryParams: { folder: this.document.id } });
    } else {
      // Pour les fichiers, naviguer vers la vue du document
      this.router.navigate(['/documents', this.document.id]);
    }
  }
}
