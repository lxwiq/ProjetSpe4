import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { DocumentService } from '../../../core/services/document.service';
import { LoggingService } from '../../../core/services/logging.service';
import { Document } from '../../../core/models/document.model';
import { environment } from '../../../../environments/environment';
import { SafeResourceUrlPipe } from '../../../shared/pipes/safe-resource-url.pipe';

@Component({
  selector: 'app-document-viewer',
  standalone: true,
  imports: [CommonModule, RouterModule, SafeResourceUrlPipe],
  templateUrl: './document-viewer.component.html'
})
export class DocumentViewerComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private documentService = inject(DocumentService);
  private http = inject(HttpClient);
  private logger = inject(LoggingService);

  // State signals
  document = signal<Document | null>(null);
  documentId = signal<number | null>(null);
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);
  fileUrl = signal<string | null>(null);
  fileType = signal<string | null>(null);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      // Vérifier que l'ID est valide et peut être converti en nombre
      if (id && !isNaN(+id) && +id > 0) {
        this.documentId.set(+id);
        this.logger.info(`ID de document valide: ${this.documentId()}`, {
          component: 'DocumentViewerComponent',
          documentId: this.documentId()
        });
        this.loadDocument();
      } else {
        this.logger.error(`ID de document invalide: ${id}`, {
          component: 'DocumentViewerComponent',
          documentId: id
        });
        this.error.set(`ID de document non valide: ${id}`);
        this.isLoading.set(false);

        // Rediriger vers la liste des documents après un court délai
        setTimeout(() => {
          this.router.navigate(['/documents']);
        }, 3000);
      }
    });
  }

  /**
   * Charge le document depuis le service
   */
  loadDocument(): void {
    // Vérifier que l'ID du document est valide
    if (!this.documentId() || isNaN(this.documentId()!) || this.documentId()! <= 0) {
      this.logger.error(`Tentative de chargement avec un ID invalide: ${this.documentId()}`, {
        component: 'DocumentViewerComponent'
      });
      this.error.set(`ID de document invalide: ${this.documentId()}`);
      this.isLoading.set(false);

      // Rediriger vers la liste des documents après un court délai
      setTimeout(() => {
        this.router.navigate(['/documents']);
      }, 3000);
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);

    this.logger.info(`Chargement du document ${this.documentId()}`, {
      component: 'DocumentViewerComponent'
    });

    this.documentService.getDocumentById(this.documentId()!).subscribe({
      next: (document) => {
        if (!document) {
          this.logger.error(`Document ${this.documentId()} non trouvé ou undefined`, {
            component: 'DocumentViewerComponent'
          });
          this.error.set('Document non trouvé. Veuillez réessayer plus tard.');
          this.isLoading.set(false);

          // Rediriger vers la liste des documents après un court délai
          setTimeout(() => {
            this.router.navigate(['/documents']);
          }, 3000);
          return;
        }

        this.document.set(document);
        this.determineFileType(document);
        this.isLoading.set(false);

        this.logger.info(`Document chargé avec succès: ${document.title}`, {
          component: 'DocumentViewerComponent',
          document: document
        });
      },
      error: (error) => {
        this.logger.error(`Erreur lors du chargement du document ${this.documentId()}`, {
          component: 'DocumentViewerComponent',
          error
        });
        this.error.set('Erreur lors du chargement du document. Veuillez réessayer plus tard.');
        this.isLoading.set(false);
      }
    });
  }

  /**
   * Détermine le type de fichier et redirige vers le bon composant
   */
  private determineFileType(document: Document): void {
    if (!document.file_type) {
      // Si pas de type de fichier, considérer comme un document texte
      this.fileType.set('text');
      this.redirectToEditor();
      return;
    }

    const fileType = document.file_type.toLowerCase();

    if (fileType.includes('image/')) {
      this.fileType.set('image');
      this.prepareImageViewer(document);
    } else if (fileType.includes('application/pdf')) {
      this.fileType.set('pdf');
      this.preparePdfViewer(document);
    } else if (fileType.includes('text/') ||
              fileType.includes('application/msword') ||
              fileType.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      this.fileType.set('text');
      this.redirectToEditor();
    } else {
      // Pour les autres types, proposer le téléchargement
      this.fileType.set('other');
      this.prepareDownload(document);
    }
  }

  /**
   * Prépare l'affichage d'une image
   */
  private prepareImageViewer(document: Document): void {
    if (document.file_path) {
      this.fileUrl.set(`${environment.apiUrl}/documents/download/${document.id}`);
    }
  }

  /**
   * Prépare l'affichage d'un PDF
   */
  private preparePdfViewer(document: Document): void {
    if (document.file_path) {
      this.fileUrl.set(`${environment.apiUrl}/documents/download/${document.id}`);
    }
  }

  /**
   * Prépare le téléchargement d'un fichier
   */
  private prepareDownload(document: Document): void {
    if (document.file_path) {
      this.fileUrl.set(`${environment.apiUrl}/documents/download/${document.id}`);
    }
  }

  /**
   * Redirige vers l'éditeur de texte
   */
  private redirectToEditor(): void {
    if (this.documentId()) {
      this.router.navigate(['/documents/edit', this.documentId()]);
    }
  }

  /**
   * Télécharge le document
   */
  downloadDocument(): void {
    if (!this.document() || !this.documentId()) return;

    this.documentService.downloadDocument(this.documentId()!).subscribe({
      next: (blob) => {
        // Créer un URL pour le blob
        const url = window.URL.createObjectURL(blob);

        // Créer un élément a temporaire
        const a = document.createElement('a');
        a.href = url;
        a.download = this.document()?.title || `document-${this.documentId()}`;

        // Ajouter l'élément au DOM, cliquer dessus, puis le supprimer
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      },
      error: (error) => {
        this.logger.error(`Erreur lors du téléchargement du document ${this.documentId()}`, {
          component: 'DocumentViewerComponent',
          error
        });
        this.error.set('Erreur lors du téléchargement du document. Veuillez réessayer plus tard.');
      }
    });
  }

  /**
   * Retourne à la liste des documents
   */
  goBack(): void {
    this.router.navigate(['/documents']);
  }
}
