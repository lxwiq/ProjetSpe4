import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { CollaborativeDocumentService } from '../../../core/services/collaborative-document.service';
import { DocumentService } from '../../../core/services/document.service';
import { LoggingService } from '../../../core/services/logging.service';
import { Document } from '../../../core/models/document.model';
import { CursorManager } from './cursor-manager';
import { VoiceCallComponent } from '../voice-call/voice-call.component';
import Quill from 'quill';

@Component({
  selector: 'app-document-editor',
  templateUrl: './document-editor.component.html',
  styleUrls: ['./document-editor.component.css'],
  imports: [CommonModule, FormsModule, VoiceCallComponent],
  standalone: true
})
export class DocumentEditorComponent implements OnInit, OnDestroy {
  @ViewChild('editor', { static: false }) editorElement!: ElementRef;

  // Propriétés pour l'éditeur
  editor: any = null;
  documentId: number | null = null;
  document = signal<Document | null>(null);
  documentTitle = signal<string>('Document sans titre');
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);
  cursorManager: CursorManager | null = null;
  saveIndicator: HTMLElement | null = null;
  isSaving = signal<boolean>(false);
  lastSaved = signal<Date | null>(null);

  // Propriété pour stocker le dernier timestamp de réception de delta
  private lastDeltaReceivedTimestamp = 0;
  // Intervalle minimum entre les applications de delta (en ms)
  private readonly DELTA_APPLY_THROTTLE_INTERVAL = 50;
  // File d'attente pour les deltas en attente d'application
  private pendingReceivedDeltas: Array<any> = [];
  // Timer pour l'application des deltas en attente
  private pendingDeltaApplyTimer: any = null;

  // Services injectés
  private route = inject(ActivatedRoute);
  private documentService = inject(DocumentService);
  public collaborativeService = inject(CollaborativeDocumentService);
  private authService = inject(AuthService);
  private logger = inject(LoggingService);

  ngOnInit(): void {
    // Récupérer l'ID du document depuis l'URL
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.documentId = parseInt(id, 10);
        this.loadDocument(this.documentId);
      } else {
        this.error.set('ID de document non spécifié');
        this.isLoading.set(false);
      }
    });
  }

  ngOnDestroy(): void {
    // Quitter le document collaboratif
    if (this.documentId) {
      this.collaborativeService.leaveDocument(this.documentId);
    }

    // Nettoyer l'éditeur
    if (this.editor) {
      this.editor = null;
    }

    // Nettoyer le gestionnaire de curseurs
    if (this.cursorManager) {
      // Nettoyer manuellement car destroy() n'existe pas
      this.cursorManager = null;
    }
  }

  /**
   * Charge le document depuis le serveur
   * @param documentId ID du document à charger
   */
  loadDocument(documentId?: number): void {
    // Si documentId n'est pas fourni, utiliser l'ID stocké dans la propriété
    if (!documentId && this.documentId) {
      documentId = this.documentId;
    } else if (!documentId) {
      this.error.set('ID de document non spécifié');
      this.isLoading.set(false);
      return;
    }
    this.isLoading.set(true);
    this.error.set(null);

    this.documentService.getDocumentById(documentId).subscribe({
      next: (document) => {
        if (document) {
          this.document.set(document);
          this.documentTitle.set(document.title || 'Document sans titre');
          this.logger.info('Document chargé avec succès', {
            component: 'DocumentEditorComponent',
            documentId,
            title: document.title
          });

          // Rejoindre le document collaboratif
          this.collaborativeService.joinDocument(documentId).subscribe({
            next: () => {
              this.logger.info('Document collaboratif rejoint avec succès', {
                component: 'DocumentEditorComponent',
                documentId
              });
              this.initEditor(document.content || '');
            },
            error: (err) => {
              this.logger.error('Erreur lors de la connexion au document collaboratif', {
                component: 'DocumentEditorComponent',
                documentId,
                error: err
              });
              this.error.set('Erreur lors de la connexion au document collaboratif');
              this.isLoading.set(false);
            }
          });
        } else {
          this.error.set('Document non trouvé');
          this.isLoading.set(false);
        }
      },
      error: (err) => {
        this.logger.error('Erreur lors du chargement du document', {
          component: 'DocumentEditorComponent',
          documentId,
          error: err
        });
        this.error.set('Erreur lors du chargement du document');
        this.isLoading.set(false);
      }
    });
  }

  /**
   * Initialise l'éditeur Quill
   * @param content Contenu initial du document
   */
  private initEditor(content: string): void {
    // Attendre que l'élément DOM soit disponible
    if (!this.editorElement) {
      setTimeout(() => this.initEditor(content), 100);
      return;
    }

    // Configurer les options de l'éditeur
    const options = {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'align': [] }],
          ['link', 'image'],
          ['clean']
        ]
      },
      placeholder: 'Commencez à écrire...'
    };

    // Créer l'éditeur
    this.editor = new Quill(this.editorElement.nativeElement, options);

    // Définir le contenu initial
    if (content) {
      this.editor.root.innerHTML = content;
    }

    // Initialiser le gestionnaire de curseurs
    try {
      if (this.editor && this.editor.container) {
        this.cursorManager = new CursorManager(this.editor.container, this.getCurrentUserId());
      } else {
        this.logger.warn('Éditeur non initialisé correctement pour le gestionnaire de curseurs', {
          component: 'DocumentEditorComponent'
        });
      }
    } catch (error) {
      this.logger.error('Erreur lors de l\'initialisation du gestionnaire de curseurs', {
        component: 'DocumentEditorComponent',
        error
      });
    }

    // Configurer les écouteurs d'événements
    this.setupEditorListeners();
    this.setupCollaborativeListeners();

    // Marquer le chargement comme terminé
    this.isLoading.set(false);
  }

  /**
   * Configure les écouteurs pour l'éditeur
   */
  private setupEditorListeners(): void {
    if (!this.editor || !this.documentId) return;

    // Écouter les modifications de texte
    this.editor.on('text-change', (delta: any, _oldDelta: any, source: string) => {
      if (source === 'user' && this.documentId) {
        try {
          const content = this.editor.root.innerHTML;
          this.collaborativeService.updateContent(this.documentId, content, delta);
        } catch (error) {
          this.logger.error('Erreur lors de l\'envoi des modifications', {
            component: 'DocumentEditorComponent',
            error
          });
        }
      }
    });

    // Écouter les changements de sélection
    this.editor.on('selection-change', (range: any, _oldRange: any, source: string) => {
      if (source === 'user' && range && this.documentId) {
        try {
          this.collaborativeService.updateCursorPosition(this.documentId, {
            index: range.index,
            length: range.length || 0
          });
        } catch (error) {
          this.logger.error('Erreur lors de l\'envoi de la position du curseur', {
            component: 'DocumentEditorComponent',
            error
          });
        }
      }
    });
  }

  /**
   * Configure les écouteurs pour l'édition collaborative
   */
  private setupCollaborativeListeners(): void {
    // Écouter les modifications de contenu
    this.collaborativeService.onContentChanged().subscribe(delta => {
      if (!this.editor) return;

      // Appliquer les modifications si elles ne viennent pas de cet utilisateur
      if (delta.userId !== this.getCurrentUserId()) {
        // Appliquer la limitation de débit (throttling) pour les deltas reçus
        const now = Date.now();
        if (now - this.lastDeltaReceivedTimestamp < this.DELTA_APPLY_THROTTLE_INTERVAL) {
          // Ajouter le delta à la file d'attente
          this.pendingReceivedDeltas.push(delta);

          // Si aucun timer n'est en cours, en créer un pour traiter les deltas en attente
          if (!this.pendingDeltaApplyTimer) {
            this.pendingDeltaApplyTimer = setTimeout(() => {
              this.processPendingReceivedDeltas();
            }, this.DELTA_APPLY_THROTTLE_INTERVAL);
          }
          return;
        }

        // Appliquer le delta immédiatement
        this.lastDeltaReceivedTimestamp = now;
        this.applyReceivedDelta(delta);
      }
    });

    // Écouter les mouvements de curseur
    this.collaborativeService.onCursorMoved().subscribe(data => {
      if (!this.cursorManager) {
        this.logger.warn('Gestionnaire de curseurs non initialisé', {
          component: 'DocumentEditorComponent'
        });
        return;
      }

      this.logger.info('Mouvement de curseur reçu', {
        component: 'DocumentEditorComponent',
        userId: data.userId,
        position: data.position
      });

      // Récupérer les informations de l'utilisateur
      const activeUsers = this.collaborativeService.activeUsers();
      this.logger.info('Utilisateurs actifs', {
        component: 'DocumentEditorComponent',
        activeUsers: activeUsers
      });

      const user = activeUsers.find(u => u.id === data.userId);

      if (user) {
        // Mettre à jour le curseur
        this.cursorManager.updateCursor(
          data.userId,
          user.username || `Utilisateur ${data.userId}`,
          {
            index: data.position.index,
            length: data.position.length || 0
          }
        );
      } else {
        this.logger.warn('Utilisateur non trouvé dans la liste des utilisateurs actifs', {
          component: 'DocumentEditorComponent',
          userId: data.userId
        });

        // Utiliser les informations minimales disponibles
        this.cursorManager.updateCursor(
          data.userId,
          `Utilisateur ${data.userId}`,
          {
            index: data.position.index,
            length: data.position.length || 0
          }
        );
      }
    });
  }

  /**
   * Traite les deltas reçus en attente d'application
   */
  private processPendingReceivedDeltas(): void {
    // Réinitialiser le timer
    this.pendingDeltaApplyTimer = null;

    if (this.pendingReceivedDeltas.length === 0) {
      return;
    }

    // Prendre le dernier delta
    const lastDelta = this.pendingReceivedDeltas.pop();

    // Vider la file d'attente
    this.pendingReceivedDeltas = [];

    if (lastDelta) {
      // Appliquer le dernier delta
      this.lastDeltaReceivedTimestamp = Date.now();
      this.applyReceivedDelta(lastDelta);
    }
  }

  /**
   * Applique un delta reçu à l'éditeur
   * @param delta Delta à appliquer
   */
  private applyReceivedDelta(delta: any): void {
    try {
      // Désactiver temporairement les événements pour éviter les boucles
      this.editor.off('text-change');

      // Vérifier si nous avons reçu un delta ou un contenu complet
      if (delta.ops && Array.isArray(delta.ops)) {
        // Appliquer le delta
        this.editor.updateContents(delta.ops, 'api');
      } else if (delta.content) {
        // Appliquer le contenu complet
        this.editor.root.innerHTML = delta.content;
      }

      // Réactiver les événements avec une fonction de rappel robuste
      this.editor.on('text-change', (newDelta: any, _oldDelta: any, source: string) => {
        if (source === 'user' && this.documentId) {
          try {
            const content = this.editor.root.innerHTML;
            this.collaborativeService.updateContent(this.documentId, content, newDelta);
          } catch (error) {
            this.logger.error('Erreur lors de l\'envoi des modifications', {
              component: 'DocumentEditorComponent',
              error
            });
          }
        }
      });
    } catch (error) {
      this.logger.error('Erreur lors de l\'application du delta', {
        component: 'DocumentEditorComponent',
        error,
        delta
      });

      // Tenter de récupérer en réattachant l'événement text-change
      try {
        this.editor.on('text-change', (newDelta: any, _oldDelta: any, source: string) => {
          if (source === 'user' && this.documentId) {
            const content = this.editor.root.innerHTML;
            this.collaborativeService.updateContent(this.documentId, content, newDelta);
          }
        });
      } catch (reattachError) {
        this.logger.error('Erreur lors de la récupération après échec d\'application de delta', {
          component: 'DocumentEditorComponent',
          error: reattachError
        });
      }
    }
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
   * @param date Date à formater
   * @returns Date formatée en chaîne de caractères
   */
  formatDate(date: Date | null): string {
    if (!date) return 'Jamais';

    // Formater la date au format local
    return new Date(date).toLocaleString();
  }

  /**
   * Sauvegarde le document
   */
  saveDocument(): void {
    if (!this.documentId || !this.editor) return;

    this.isSaving.set(true);

    try {
      const content = this.editor.root.innerHTML;
      // Mettre à jour le contenu d'abord
      this.collaborativeService.updateContent(this.documentId, content);
      // Puis sauvegarder
      this.collaborativeService.saveDocument(this.documentId).subscribe({
        next: (result) => {
          this.lastSaved.set(new Date(result.savedAt));
          this.isSaving.set(false);
        },
        error: (error) => {
          this.logger.error('Erreur lors de la sauvegarde du document', {
            component: 'DocumentEditorComponent',
            documentId: this.documentId,
            error
          });
          this.isSaving.set(false);
        }
      });
    } catch (error) {
      this.logger.error('Erreur lors de la sauvegarde du document', {
        component: 'DocumentEditorComponent',
        documentId: this.documentId,
        error
      });
      this.isSaving.set(false);
    }
  }

  /**
   * Récupère les IDs des utilisateurs actifs
   * @returns Tableau des IDs des utilisateurs actifs
   */
  activeUserIds(): number[] {
    return this.collaborativeService.activeUsers().map(user => user.id);
  }
}
