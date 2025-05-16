import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Import ngx-quill
import { QuillModule } from 'ngx-quill';
import Quill from 'quill';
import 'quill-delta';

import { AuthService } from '../../../core/services/auth.service';
import { CollaborativeDocumentService } from '../../../core/services/collaborative-document.service';
import { DocumentService } from '../../../core/services/document.service';
import { LoggingService } from '../../../core/services/logging.service';
import { AlertService } from '../../../core/services/alert.service';
import { Document } from '../../../core/models/document.model';
import { VoiceCallComponent } from '../voice-call/voice-call.component';
import { DocumentChatComponent } from '../document-chat/document-chat.component';
import { InviteCollaboratorsModalComponent } from '../invite-collaborators-modal/invite-collaborators-modal.component';

@Component({
  selector: 'app-document-editor',
  templateUrl: './document-editor.component.html',
  styleUrls: ['./document-editor.component.css'],
  imports: [CommonModule, FormsModule, RouterLink, QuillModule, VoiceCallComponent, DocumentChatComponent, InviteCollaboratorsModalComponent],
  standalone: true
})
export class DocumentEditorComponent implements OnInit, OnDestroy {
  @ViewChild('editor', { static: false }) editorElement!: ElementRef;

  // Propriétés pour l'éditeur ngx-quill
  editor: any = null;
  documentId: number | null = null;
  document = signal<Document | null>(null);
  documentTitle = signal<string>('Document sans titre');
  editorContent: string = '';

  // Configuration des modules Quill
  quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'],
      ['link', 'image']
    ]
  };

  // Indicateur pour éviter les boucles de mise à jour
  private isLocalUpdate = false;
  private isRemoteUpdate = false;
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);
  saveIndicator: HTMLElement | null = null;
  isSaving = signal<boolean>(false);
  lastSaved = signal<Date | null>(null);
  showInviteModal = signal<boolean>(false);

  // Propriété pour stocker le dernier timestamp de réception de delta
  private lastDeltaReceivedTimestamp = 0;
  // Intervalle minimum entre les applications de delta (en ms)
  private readonly DELTA_APPLY_THROTTLE_INTERVAL = 15; // Réduit à 15ms pour une meilleure réactivité
  // File d'attente pour les deltas en attente d'application
  private pendingReceivedDeltas: Array<any> = [];
  // Timer pour l'application des deltas en attente
  private pendingDeltaApplyTimer: any = null;
  // Compteur pour la vérification périodique de la cohérence du contenu
  private contentSyncCounter = 0;
  // Intervalle pour la vérification complète de la cohérence (réduit à 15 deltas pour une synchronisation plus fréquente)
  private readonly CONTENT_SYNC_INTERVAL = 15;
  // Délai avant de considérer que l'éditeur est stable après une modification (en ms)
  private readonly EDITOR_STABILITY_DELAY = 500;

  // Services injectés
  private route = inject(ActivatedRoute);
  private documentService = inject(DocumentService);
  public collaborativeService = inject(CollaborativeDocumentService);
  private authService = inject(AuthService);
  private logger = inject(LoggingService);
  private alertService = inject(AlertService);

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

    // Stocker l'ID du document
    this.documentId = documentId;

    this.logger.info('Chargement du document', {
      component: 'DocumentEditorComponent',
      documentId
    });

    // Procédure améliorée de chargement et de jointure du document
    // 1. D'abord, récupérer les métadonnées du document
    this.documentService.getDocumentById(documentId).subscribe({
      next: (document) => {
        if (!document) {
          this.error.set('Document non trouvé');
          this.isLoading.set(false);
          return;
        }

        // Mettre à jour les métadonnées du document
        this.document.set(document);
        this.documentTitle.set(document.title || 'Document sans titre');

        this.logger.info('Métadonnées du document chargées avec succès', {
          component: 'DocumentEditorComponent',
          documentId,
          title: document.title
        });

        // 2. Rejoindre le document collaboratif pour établir la connexion WebSocket
        this.collaborativeService.joinDocument(documentId).subscribe({
          next: (joinResponse) => {
            this.logger.info('Document collaboratif rejoint avec succès', {
              component: 'DocumentEditorComponent',
              documentId,
              activeUsers: joinResponse.activeUsers?.length || 0
            });

            // 3. Initialiser l'éditeur avec le contenu le plus à jour
            // Utiliser le contenu du document récupéré via l'API REST plutôt que celui du WebSocket
            // pour s'assurer d'avoir l'état le plus récent et complet
            const initialContent = document.content || '';

            // Initialiser l'éditeur avec le contenu
            this.initEditor(initialContent);

            // 4. Ajouter un délai avant d'accepter les mises à jour collaboratives
            // pour éviter les problèmes de synchronisation initiale
            setTimeout(() => {
              this.logger.info('Prêt à recevoir les mises à jour collaboratives', {
                component: 'DocumentEditorComponent',
                documentId
              });

              // Vérifier une dernière fois la cohérence du contenu
              if (document.content && this.editor) {
                const currentContent = this.editor.root.innerHTML;
                if (this.normalizeHtml(currentContent) !== this.normalizeHtml(document.content)) {
                  this.logger.warn('Incohérence détectée après initialisation, synchronisation forcée', {
                    component: 'DocumentEditorComponent'
                  });
                  this.forceFullContentSync(document.content);
                }
              }
            }, this.EDITOR_STABILITY_DELAY * 2); // Délai plus long pour s'assurer que l'éditeur est stable
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
  /**
   * Initialise l'éditeur Quill via ngx-quill
   * @param content Contenu initial du document
   */
  private initEditor(content: string): void {
    this.logger.info('Initialisation de l\'\u00e9diteur avec contenu', {
      component: 'DocumentEditorComponent',
      contentLength: content ? content.length : 0
    });

    // Avec ngx-quill, nous n'avons pas besoin d'initialiser manuellement l'éditeur
    // car il est géré par le composant quill-editor

    // Définir le contenu initial
    if (content) {
      // Nettoyer le contenu HTML avant de l'appliquer pour éviter les problèmes de formatage
      const cleanedContent = this.sanitizeHtml(content);
      this.isRemoteUpdate = true;
      this.editorContent = cleanedContent;
      setTimeout(() => {
        this.isRemoteUpdate = false;
      }, 0);
    }

    // Attendre un court instant pour s'assurer que l'éditeur est stable
    setTimeout(() => {
      // Configurer les écouteurs d'événements collaboratifs
      this.setupCollaborativeListeners();

      // Marquer le chargement comme terminé
      this.isLoading.set(false);

      this.logger.info('Initialisation de l\'\u00e9diteur terminée', {
        component: 'DocumentEditorComponent'
      });
    }, this.EDITOR_STABILITY_DELAY);
  }

  /**
   * Gère la création de l'éditeur Quill par ngx-quill
   * @param quill Instance de l'éditeur Quill
   */
  onEditorCreated(quill: any): void {
    this.editor = quill;
    this.logger.info('\u00c9diteur Quill cr\u00e9\u00e9 via ngx-quill', {
      component: 'DocumentEditorComponent'
    });
  }

  /**
   * Gère les changements de contenu de l'éditeur
   * @param event Événement de changement de contenu
   */
  onContentChanged(event: any): void {
    // Éviter les boucles de mise à jour
    if (this.isRemoteUpdate) {
      this.logger.debug('Mise à jour ignorée car isRemoteUpdate=true', {
        component: 'DocumentEditorComponent'
      });
      return;
    }

    // Journaliser l'événement pour le débogage
    this.logger.debug('Changement de contenu détecté', {
      component: 'DocumentEditorComponent',
      hasHtml: !!event.html,
      hasDelta: !!(event.content && event.content.ops),
      htmlLength: event.html ? event.html.length : 0
    });

    // Marquer comme mise à jour locale
    this.isLocalUpdate = true;

    // Envoyer les modifications au service collaboratif
    if (this.documentId) {
      try {
        const content = event.html;
        const delta = event.content;

        // Vérifier que nous avons un contenu valide
        if (content) {
          this.collaborativeService.updateContent(this.documentId, content, delta);

          this.logger.debug('Contenu envoyé au service collaboratif', {
            component: 'DocumentEditorComponent',
            contentLength: content.length,
            hasDelta: !!(delta && delta.ops)
          });
        } else {
          this.logger.warn('Contenu vide détecté, mise à jour ignorée', {
            component: 'DocumentEditorComponent'
          });
        }
      } catch (error) {
        this.logger.error('Erreur lors de l\'envoi des modifications', {
          component: 'DocumentEditorComponent',
          error
        });
      }
    }

    // Réinitialiser l'indicateur après un court délai
    setTimeout(() => {
      this.isLocalUpdate = false;

      // Traiter les deltas en attente après avoir terminé la mise à jour locale
      if (this.pendingReceivedDeltas.length > 0) {
        this.processPendingReceivedDeltas();
      }
    }, 50); // Augmenter le délai pour s'assurer que toutes les opérations sont terminées
  }

  /**
   * Nettoie le HTML pour éviter les problèmes de formatage
   * @param html HTML à nettoyer
   * @returns HTML nettoyé
   */
  private sanitizeHtml(html: string): string {
    if (!html) return '';

    // Remplacer les balises <p><br></p> vides par <p></p>
    let sanitized = html.replace(/<p><br><\/p>/gi, '<p></p>');

    // S'assurer que le document commence par une balise <p> si ce n'est pas déjà le cas
    if (!sanitized.trim().startsWith('<p>')) {
      // Vérifier si le contenu commence par une balise HTML
      if (sanitized.trim().startsWith('<')) {
        // Le contenu commence déjà par une balise, ne rien faire
      } else {
        // Envelopper le contenu dans une balise <p>
        sanitized = `<p>${sanitized}</p>`;
      }
    }

    // S'assurer que le document se termine par une balise </p> si ce n'est pas déjà le cas
    if (!sanitized.trim().endsWith('</p>')) {
      // Vérifier si le contenu se termine par une balise HTML fermante
      if (sanitized.trim().endsWith('>')) {
        // Le contenu se termine déjà par une balise, ne rien faire
      } else {
        // Fermer le contenu avec une balise </p>
        sanitized = `${sanitized}</p>`;
      }
    }

    return sanitized;
  }

  // Propriétés pour la gestion des conflits
  private lastLocalChangeTimestamp = 0;
  private readonly LOCAL_CHANGE_DEBOUNCE = 300; // ms
  private pendingLocalChanges: Array<any> = [];
  private localChangeTimer: any = null;
  private conflictDetected = false;
  private conflictResolutionInProgress = false;

  /**
   * Configure les écouteurs pour l'éditeur
   */
  private setupEditorListeners(): void {
    if (!this.editor || !this.documentId) return;

    // Écouter les modifications de texte avec une stratégie améliorée de gestion des conflits
    this.editor.on('text-change', (delta: any, _oldDelta: any, source: string) => {
      if (source === 'user' && this.documentId) {
        try {
          const now = Date.now();
          const content = this.editor.root.innerHTML;

          // Si un conflit est en cours de résolution, ne pas envoyer de modifications
          if (this.conflictResolutionInProgress) {
            this.logger.info('Modification locale ignorée pendant la résolution d\'un conflit', {
              component: 'DocumentEditorComponent'
            });
            return;
          }

          // Appliquer un debounce pour regrouper les modifications rapides
          // et réduire les risques de conflits
          if (now - this.lastLocalChangeTimestamp < this.LOCAL_CHANGE_DEBOUNCE) {
            // Ajouter la modification à la file d'attente
            this.pendingLocalChanges.push({ delta, content });

            // Si aucun timer n'est en cours, en créer un pour traiter les modifications en attente
            if (!this.localChangeTimer) {
              this.localChangeTimer = setTimeout(() => {
                this.processLocalChanges();
              }, this.LOCAL_CHANGE_DEBOUNCE);
            }
            return;
          }

          // Envoyer la modification immédiatement
          this.lastLocalChangeTimestamp = now;
          this.collaborativeService.updateContent(this.documentId, content, delta);
        } catch (error) {
          this.logger.error('Erreur lors de l\'envoi des modifications', {
            component: 'DocumentEditorComponent',
            error
          });
        }
      }
    });
  }

  /**
   * Traite les modifications locales en attente
   */
  private processLocalChanges(): void {
    // Réinitialiser le timer
    this.localChangeTimer = null;

    if (this.pendingLocalChanges.length === 0 || !this.documentId) {
      return;
    }

    try {
      // Utiliser le dernier contenu complet plutôt que d'essayer de fusionner les deltas
      const lastChange = this.pendingLocalChanges[this.pendingLocalChanges.length - 1];
      const content = lastChange.content;

      // Vider la file d'attente
      this.pendingLocalChanges = [];

      // Mettre à jour le timestamp
      this.lastLocalChangeTimestamp = Date.now();

      // Envoyer le contenu complet
      this.collaborativeService.updateContent(this.documentId, content);

      this.logger.info(`${this.pendingLocalChanges.length} modifications locales traitées et envoyées`, {
        component: 'DocumentEditorComponent'
      });
    } catch (error) {
      this.logger.error('Erreur lors du traitement des modifications locales', {
        component: 'DocumentEditorComponent',
        error
      });
    }
  }

  /**
   * Détecte et résout les conflits d'édition
   * @param remoteContent Contenu reçu d'un autre utilisateur
   * @param localContent Contenu local actuel
   * @returns true si un conflit a été détecté et résolu
   */
  private detectAndResolveConflict(remoteContent: string, localContent: string): boolean {
    // Si les contenus sont identiques après normalisation, il n'y a pas de conflit
    if (this.normalizeHtml(remoteContent) === this.normalizeHtml(localContent)) {
      return false;
    }

    this.logger.warn('Conflit d\'\u00e9dition détecté', {
      component: 'DocumentEditorComponent'
    });

    // Marquer qu'un conflit est en cours de résolution
    this.conflictResolutionInProgress = true;
    this.conflictDetected = true;

    // Stratégie de résolution : utiliser le contenu distant comme base
    // mais conserver les modifications locales non sauvegardées si possible

    // 1. Sauvegarder la position actuelle du curseur
    const selection = this.editor.getSelection();

    // 2. Appliquer le contenu distant
    this.editor.off('text-change');
    this.editor.root.innerHTML = remoteContent;

    // 3. Rétablir la position du curseur si possible
    if (selection) {
      try {
        this.editor.setSelection(selection.index, selection.length);
      } catch (error) {
        this.logger.warn('Impossible de restaurer la position du curseur après résolution de conflit', {
          component: 'DocumentEditorComponent',
          error
        });
      }
    }

    // 4. Réactiver les écouteurs
    this.reattachTextChangeListener();

    // 5. Terminer la résolution du conflit après un court délai
    setTimeout(() => {
      this.conflictResolutionInProgress = false;
      this.logger.info('Résolution de conflit terminée', {
        component: 'DocumentEditorComponent'
      });
    }, this.EDITOR_STABILITY_DELAY);

    return true;
  }

  // Indicateur pour savoir si l'éditeur est prêt à recevoir des mises à jour collaboratives
  private isReadyForCollaboration = false;
  // File d'attente pour les deltas reçus avant que l'éditeur ne soit prêt
  private earlyReceivedDeltas: Array<any> = [];

  /**
   * Configure les écouteurs pour l'édition collaborative
   */
  private setupCollaborativeListeners(): void {
    // Marquer l'éditeur comme prêt après un délai pour éviter les problèmes de synchronisation initiale
    setTimeout(() => {
      this.isReadyForCollaboration = true;

      // Traiter les deltas reçus pendant l'initialisation
      if (this.earlyReceivedDeltas.length > 0) {
        this.logger.info(`Traitement de ${this.earlyReceivedDeltas.length} deltas reçus pendant l'initialisation`, {
          component: 'DocumentEditorComponent'
        });

        // Si nous avons beaucoup de deltas en attente, utiliser une synchronisation complète
        if (this.earlyReceivedDeltas.length > 5 && this.documentId) {
          this.logger.warn('Trop de deltas en attente après initialisation, demande de synchronisation complète', {
            component: 'DocumentEditorComponent',
            deltaCount: this.earlyReceivedDeltas.length
          });

          // Vider la file d'attente
          this.earlyReceivedDeltas = [];

          // Demander une synchronisation complète
          this.requestFullContentSync();
        } else {
          // Avec ngx-quill, nous appliquons directement le dernier contenu complet
          const lastDelta = this.earlyReceivedDeltas[this.earlyReceivedDeltas.length - 1];
          if (lastDelta && lastDelta.content) {
            this.applyRemoteContent(lastDelta.content);
          }
          this.earlyReceivedDeltas = [];
        }
      }
    }, this.EDITOR_STABILITY_DELAY);

    // Écouter les modifications de contenu
    this.collaborativeService.onContentChanged().subscribe(delta => {
      if (!this.editor) return;

      // Journaliser la réception d'un delta pour le débogage
      this.logger.debug('Delta reçu', {
        component: 'DocumentEditorComponent',
        fromUserId: delta.userId,
        currentUserId: this.getCurrentUserId(),
        hasContent: !!delta.content,
        hasOps: !!(delta.ops && Array.isArray(delta.ops))
      });

      // Appliquer les modifications si elles ne viennent pas de cet utilisateur
      if (delta.userId !== this.getCurrentUserId()) {
        // Si l'éditeur n'est pas encore prêt, stocker les deltas pour les traiter plus tard
        if (!this.isReadyForCollaboration) {
          this.earlyReceivedDeltas.push(delta);
          this.logger.info('Delta stocké pour traitement ultérieur (initialisation en cours)', {
            component: 'DocumentEditorComponent'
          });
          return;
        }

        // Si nous sommes en train de faire une mise à jour locale, mettre le delta en file d'attente
        // au lieu de l'ignorer complètement
        if (this.isLocalUpdate) {
          this.pendingReceivedDeltas.push(delta);
          this.logger.info('Delta mis en file d\'attente (mise à jour locale en cours)', {
            component: 'DocumentEditorComponent'
          });

          // Planifier le traitement des deltas en attente après un court délai
          if (!this.pendingDeltaApplyTimer) {
            this.pendingDeltaApplyTimer = setTimeout(() => {
              this.processPendingReceivedDeltas();
            }, 100);
          }
          return;
        }

        // Incrémenter le compteur de synchronisation
        this.contentSyncCounter++;

        // Vérifier périodiquement la cohérence complète du contenu
        if (this.contentSyncCounter >= this.CONTENT_SYNC_INTERVAL && delta.content) {
          this.contentSyncCounter = 0;
          this.logger.info('Synchronisation périodique complète du contenu', {
            component: 'DocumentEditorComponent'
          });
          this.applyRemoteContent(delta.content);
          return;
        }

        // Toujours utiliser le contenu complet s'il est disponible
        if (delta.content) {
          this.logger.info('Application du contenu complet reçu', {
            component: 'DocumentEditorComponent',
            contentLength: delta.content.length
          });
          this.applyRemoteContent(delta.content);
          return;
        }

        // Si nous avons des ops mais pas de contenu complet, essayer d'appliquer le delta
        if (delta.ops && Array.isArray(delta.ops)) {
          try {
            // Désactiver temporairement les événements pour éviter les boucles
            this.editor.off('text-change');

            // Appliquer le delta
            this.editor.updateContents(delta.ops, 'api');

            // Réactiver les écouteurs
            this.reattachTextChangeListener();

            this.logger.info('Delta appliqué avec succès', {
              component: 'DocumentEditorComponent'
            });
          } catch (error) {
            this.logger.error('Erreur lors de l\'application du delta, demande de synchronisation complète', {
              component: 'DocumentEditorComponent',
              error
            });

            // En cas d'erreur, demander une synchronisation complète
            this.requestFullContentSync();
          }
          return;
        }

        // Si nous n'avons ni contenu complet ni ops valides, journaliser l'erreur
        this.logger.warn('Delta reçu sans contenu ni ops valides, ignoré', {
          component: 'DocumentEditorComponent',
          delta
        });
      }
    });

    // Écouter les événements de sauvegarde
    this.collaborativeService.onDocumentSaved().subscribe(data => {
      if (data.documentId === this.documentId) {
        this.lastSaved.set(new Date(data.savedAt));
        this.logger.info('Document sauvegardé', {
          component: 'DocumentEditorComponent',
          documentId: data.documentId,
          savedAt: data.savedAt,
          versionNumber: data.versionNumber
        });
      }
    });
  }

  /**
   * Applique le contenu distant à l'éditeur
   * @param content Contenu HTML à appliquer
   */
  private applyRemoteContent(content: string): void {
    if (!content) return;

    try {
      // Nettoyer le contenu HTML
      const cleanedContent = this.sanitizeHtml(content);

      // Marquer comme mise à jour distante pour éviter les boucles
      this.isRemoteUpdate = true;

      // Appliquer le contenu directement à l'éditeur Quill pour une mise à jour plus fiable
      if (this.editor && this.editor.root) {
        // Désactiver temporairement les événements pour éviter les boucles
        this.editor.off('text-change');

        // Appliquer le contenu directement au DOM de l'éditeur
        this.editor.root.innerHTML = cleanedContent;

        // Réactiver les écouteurs
        this.reattachTextChangeListener();

        this.logger.info('Contenu distant appliqué directement à l\'éditeur', {
          component: 'DocumentEditorComponent',
          contentLength: cleanedContent.length
        });
      } else {
        // Fallback à la méthode ngx-quill si l'éditeur n'est pas disponible
        this.editorContent = cleanedContent;

        this.logger.info('Contenu distant appliqué via ngx-quill', {
          component: 'DocumentEditorComponent',
          contentLength: cleanedContent.length
        });
      }

      // Réinitialiser l'indicateur après un court délai
      setTimeout(() => {
        this.isRemoteUpdate = false;
      }, 50); // Augmenter le délai pour s'assurer que toutes les opérations sont terminées
    } catch (error) {
      this.logger.error('Erreur lors de l\'application du contenu distant', {
        component: 'DocumentEditorComponent',
        error
      });

      // En cas d'erreur, essayer la méthode de secours
      try {
        // Nettoyer à nouveau le contenu HTML pour éviter les erreurs
        const fallbackContent = this.sanitizeHtml(content);
        this.editorContent = fallbackContent;
        setTimeout(() => {
          this.isRemoteUpdate = false;
        }, 50);
      } catch (fallbackError) {
        this.logger.error('Échec de la méthode de secours pour appliquer le contenu distant', {
          component: 'DocumentEditorComponent',
          error: fallbackError
        });
      }
    }
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

    // Optimisation: si nous avons trop de deltas en attente, utiliser le dernier contenu complet
    if (this.pendingReceivedDeltas.length > 5) { // Seuil réduit pour une synchronisation plus fréquente
      // Chercher le dernier delta avec un contenu complet
      for (let i = this.pendingReceivedDeltas.length - 1; i >= 0; i--) {
        if (this.pendingReceivedDeltas[i].content) {
          const contentDelta = this.pendingReceivedDeltas[i];
          this.pendingReceivedDeltas = [];
          this.lastDeltaReceivedTimestamp = Date.now();
          this.logger.info('Trop de deltas en attente, utilisation du dernier contenu complet', {
            component: 'DocumentEditorComponent',
            deltaCount: this.pendingReceivedDeltas.length
          });

          // Forcer une synchronisation complète plutôt que d'appliquer des deltas
          this.forceFullContentSync(contentDelta.content);
          return;
        }
      }
    }

    // Si nous n'avons pas trouvé de contenu complet mais que nous avons beaucoup de deltas,
    // demander une synchronisation complète
    if (this.pendingReceivedDeltas.length > 10 && this.documentId) {
      this.logger.warn('Trop de deltas sans contenu complet, demande de synchronisation complète', {
        component: 'DocumentEditorComponent',
        deltaCount: this.pendingReceivedDeltas.length
      });

      // Vider la file d'attente
      this.pendingReceivedDeltas = [];

      // Demander une synchronisation complète
      this.requestFullContentSync();
      return;
    }

    // Approche améliorée: utiliser le dernier delta avec contenu complet s'il existe
    let lastContentDelta = null;
    for (let i = this.pendingReceivedDeltas.length - 1; i >= 0; i--) {
      if (this.pendingReceivedDeltas[i].content) {
        lastContentDelta = this.pendingReceivedDeltas[i];
        break;
      }
    }

    if (lastContentDelta) {
      // Utiliser le dernier delta avec contenu complet
      this.pendingReceivedDeltas = [];
      this.lastDeltaReceivedTimestamp = Date.now();
      this.applyReceivedDelta(lastContentDelta);
      return;
    }

    // Si nous n'avons que des deltas sans contenu complet, les appliquer un par un dans l'ordre
    // plutôt que d'essayer de les fusionner, ce qui peut causer des problèmes
    const deltasToApply = [...this.pendingReceivedDeltas];
    this.pendingReceivedDeltas = [];

    // Appliquer chaque delta individuellement dans l'ordre
    for (const delta of deltasToApply) {
      this.lastDeltaReceivedTimestamp = Date.now();
      this.applyReceivedDelta(delta);
    }
  }

  /**
   * Force une synchronisation complète du contenu
   * @param content Contenu HTML complet à appliquer
   */
  private forceFullContentSync(content: string): void {
    if (!this.editor || !content) return;

    try {
      // Appliquer le contenu complet
      this.logger.info('Synchronisation complète forcée du contenu', {
        component: 'DocumentEditorComponent',
        contentLength: content.length
      });

      // Utiliser la méthode dédiée pour appliquer le contenu distant
      this.applyRemoteContent(content);

      // Réinitialiser le compteur de synchronisation
      this.contentSyncCounter = 0;
    } catch (error) {
      this.logger.error('Erreur lors de la synchronisation complète du contenu', {
        component: 'DocumentEditorComponent',
        error
      });
    }
  }

  /**
   * Demande une synchronisation complète du contenu au serveur
   */
  private requestFullContentSync(): void {
    if (!this.documentId) return;

    this.logger.info('Demande de synchronisation complète du contenu', {
      component: 'DocumentEditorComponent',
      documentId: this.documentId
    });

    // Récupérer le document depuis le serveur
    this.documentService.getDocumentById(this.documentId).subscribe({
      next: (document) => {
        if (document && document.content) {
          // Utiliser la méthode dédiée pour appliquer le contenu distant
          this.applyRemoteContent(document.content);

          // Réinitialiser le compteur de synchronisation
          this.contentSyncCounter = 0;
        } else {
          this.logger.warn('Document récupéré sans contenu lors de la synchronisation', {
            component: 'DocumentEditorComponent',
            documentId: this.documentId
          });
        }
      },
      error: (error) => {
        this.logger.error('Erreur lors de la récupération du document pour synchronisation', {
          component: 'DocumentEditorComponent',
          documentId: this.documentId,
          error
        });
      }
    });
  }

  /**
   * Applique un delta reçu à l'éditeur
   * @param delta Delta à appliquer
   */
  private applyReceivedDelta(delta: any): void {
    try {
      // Si un conflit est en cours de résolution, mettre le delta en file d'attente
      if (this.conflictResolutionInProgress) {
        this.logger.info('Delta reçu pendant la résolution d\'un conflit, mise en file d\'attente', {
          component: 'DocumentEditorComponent'
        });
        this.pendingReceivedDeltas.push(delta);
        return;
      }

      // Désactiver temporairement les événements pour éviter les boucles
      this.editor.off('text-change');

      // Incrémenter le compteur de synchronisation
      this.contentSyncCounter++;

      // Vérification périodique complète de la cohérence du contenu
      const forceFullSync = this.contentSyncCounter >= this.CONTENT_SYNC_INTERVAL && delta.content;

      // Capturer le contenu actuel pour la détection de conflits
      const currentContent = this.editor.root.innerHTML;

      // Vérifier si nous avons reçu un delta ou un contenu complet
      if (delta.ops && Array.isArray(delta.ops) && !forceFullSync) {
        try {
          // Vérifier s'il y a un conflit potentiel avec le contenu distant
          if (delta.content && this.pendingLocalChanges.length > 0) {
            // Détecter et résoudre le conflit
            const conflictResolved = this.detectAndResolveConflict(delta.content, currentContent);
            if (conflictResolved) {
              // Le conflit a été résolu, pas besoin d'appliquer le delta
              return;
            }
          }

          // Appliquer le delta
          this.editor.updateContents(delta.ops, 'api');

          // Vérifier la cohérence avec le contenu complet si disponible
          if (delta.content) {
            // Comparer le contenu actuel avec le contenu attendu
            const updatedContent = this.editor.root.innerHTML;
            if (this.normalizeHtml(updatedContent) !== this.normalizeHtml(delta.content)) {
              this.logger.warn('Incohérence détectée après application du delta, synchronisation forcée', {
                component: 'DocumentEditorComponent'
              });

              // Détecter et résoudre le conflit
              const conflictResolved = this.detectAndResolveConflict(delta.content, updatedContent);
              if (!conflictResolved) {
                // Si aucun conflit n'a été détecté, forcer la synchronisation
                this.forceFullContentSync(delta.content);
              }
            }
          }
        } catch (deltaError) {
          // En cas d'erreur lors de l'application du delta, utiliser le contenu complet
          this.logger.warn('Erreur lors de l\'application du delta, utilisation du contenu complet', {
            component: 'DocumentEditorComponent',
            error: deltaError
          });

          if (delta.content) {
            // Détecter et résoudre le conflit
            const conflictResolved = this.detectAndResolveConflict(delta.content, currentContent);
            if (!conflictResolved) {
              // Si aucun conflit n'a été détecté, forcer la synchronisation
              this.forceFullContentSync(delta.content);
            }
          }
        }
      } else if (delta.content) {
        // Appliquer le contenu complet (soit parce que c'est tout ce que nous avons,
        // soit pour une synchronisation périodique complète)
        if (forceFullSync) {
          this.logger.info('Synchronisation périodique complète du contenu', {
            component: 'DocumentEditorComponent'
          });
          this.contentSyncCounter = 0;
        }

        // Détecter et résoudre le conflit
        const conflictResolved = this.detectAndResolveConflict(delta.content, currentContent);
        if (!conflictResolved) {
          // Si aucun conflit n'a été détecté, forcer la synchronisation
          this.forceFullContentSync(delta.content);
        }
        return; // Sortir tôt car forceFullContentSync réattache déjà les écouteurs
      }

      // Réactiver les événements avec une fonction de rappel robuste
      this.reattachTextChangeListener();
    } catch (error) {
      this.logger.error('Erreur lors de l\'application du delta', {
        component: 'DocumentEditorComponent',
        error,
        delta
      });

      // Tenter de récupérer en réattachant l'événement text-change
      this.reattachTextChangeListener();

      // Si nous avons un contenu complet, essayer de l'appliquer comme dernier recours
      if (delta.content) {
        try {
          this.forceFullContentSync(delta.content);
        } catch (contentError) {
          this.logger.error('Erreur lors de l\'application du contenu complet après échec', {
            component: 'DocumentEditorComponent',
            error: contentError
          });
        }
      }
    }
  }

  /**
   * Normalise le HTML pour la comparaison
   * @param html HTML à normaliser
   * @returns HTML normalisé
   */
  private normalizeHtml(html: string): string {
    if (!html) return '';

    // Pré-traitement pour gérer les sauts de ligne et les balises de paragraphe
    let normalized = html
      // Remplacer les balises <br> par un espace
      .replace(/<br\s*\/?>/gi, ' ')
      // Normaliser les balises de paragraphe
      .replace(/<\/p>\s*<p>/gi, '</p><p>')
      // Normaliser les espaces autour des balises
      .replace(/\s+</g, '<')
      .replace(/>\s+/g, '>')
      // Remplacer les séquences d'espaces par un seul espace
      .replace(/\s+/g, ' ')
      // Supprimer les espaces entre les balises
      .replace(/> </g, '><')
      // Supprimer les espaces au début et à la fin
      .trim();

    // Normaliser les attributs de style qui peuvent être dans un ordre différent
    // mais représentent la même chose
    normalized = normalized.replace(/style="([^"]*)"/gi, (match, styles) => {
      // Diviser les styles en paires clé-valeur
      const styleArray = styles.split(';')
        .filter((s: string) => s.trim() !== '')
        .map((s: string) => s.trim())
        .sort();

      // Reconstruire la chaîne de style triée
      return `style="${styleArray.join(';')}${styleArray.length ? ';' : ''}"`;
    });

    return normalized;
  }

  /**
   * Réattache l'écouteur d'événements text-change à l'éditeur
   */
  private reattachTextChangeListener(): void {
    if (!this.editor) return;

    try {
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
      this.logger.error('Erreur lors de la réactivation de l\'écouteur text-change', {
        component: 'DocumentEditorComponent',
        error
      });
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

  /**
   * Ouvre la boîte de dialogue d'invitation de collaborateurs
   */
  openInviteModal(): void {
    this.showInviteModal.set(true);
  }

  /**
   * Ferme la boîte de dialogue d'invitation de collaborateurs
   */
  closeInviteModal(): void {
    this.showInviteModal.set(false);
  }
}
