import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { DocumentService } from '../../../core/services/document.service';
import { CollaborativeDocumentService } from '../../../core/services/collaborative-document.service';
import { AuthService } from '../../../core/services/auth.service';
import { LoggingService } from '../../../core/services/logging.service';
import { Document } from '../../../core/models/document.model';
// Document collaborators component has been removed as part of the permissions system removal
import { VoiceCallComponent } from '../voice-call/voice-call.component';
import { CursorManager } from './cursor-manager';

// Déclaration pour Quill
declare var Quill: any;

@Component({
  selector: 'app-document-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, VoiceCallComponent],
  templateUrl: './document-editor.component.html',
  styleUrls: ['./document-editor.component.css']
})
export class DocumentEditorComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('editor') editorElement!: ElementRef;

  // Signaux pour l'état du composant
  document = signal<Document | null>(null);
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);
  isSaving = signal<boolean>(false);
  lastSaved = signal<Date | null>(null);
  documentTitle = signal<string>('');

  // Liste des IDs des utilisateurs actifs
  activeUserIds = signal<number[]>([]);

  // Éditeur Quill
  editor: any;
  documentId!: number;
  private isEditorReady = false;
  private isContentLoaded = false;
  private cursorManager: CursorManager | null = null;
  private saveIndicator: HTMLElement | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private documentService: DocumentService,
    public collaborativeService: CollaborativeDocumentService,
    private authService: AuthService,
    private logger: LoggingService
  ) {
    // Au lieu d'utiliser des effets qui peuvent causer des boucles,
    // nous allons configurer des écouteurs manuels pour les changements d'état
    this.setupStateListeners();
  }

  /**
   * Configure les écouteurs pour les changements d'état
   */
  private setupStateListeners(): void {
    // Créer un intervalle pour vérifier périodiquement les changements d'état
    const stateCheckInterval = setInterval(() => {
      // Vérifier l'état de sauvegarde
      const isSaving = this.collaborativeService.isSaving();
      if (this.isSaving() !== isSaving) {
        this.isSaving.set(isSaving);
      }

      // Vérifier la dernière sauvegarde
      const lastSaved = this.collaborativeService.lastSaved();
      if (lastSaved && (!this.lastSaved() || this.lastSaved()!.getTime() !== lastSaved.getTime())) {
        this.lastSaved.set(lastSaved);
        this.logger.debug('Dernière sauvegarde mise à jour', {
          component: 'DocumentEditorComponent',
          lastSaved
        });
      }

      // Mettre à jour la liste des IDs des utilisateurs actifs
      const activeUsers = this.collaborativeService.activeUsers();
      const activeUserIds = activeUsers.map(user => user.id);
      if (JSON.stringify(this.activeUserIds()) !== JSON.stringify(activeUserIds)) {
        this.activeUserIds.set(activeUserIds);
        this.logger.debug('Liste des utilisateurs actifs mise à jour', {
          component: 'DocumentEditorComponent',
          activeUserCount: activeUsers.length
        });
      }
    }, 1000); // Vérifier toutes les secondes

    // Nettoyer l'intervalle lors de la destruction du composant
    const originalOnDestroy = this.ngOnDestroy;
    this.ngOnDestroy = function() {
      clearInterval(stateCheckInterval);
      if (originalOnDestroy) {
        originalOnDestroy.apply(this);
      }
    };
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      // Vérifier que l'ID est valide et peut être converti en nombre
      if (id && !isNaN(+id) && +id > 0) {
        this.documentId = +id;
        this.logger.info(`ID de document valide: ${this.documentId}`, {
          component: 'DocumentEditorComponent',
          documentId: this.documentId
        });
        this.loadDocument();
      } else {
        this.logger.error(`ID de document invalide: ${id}`, {
          component: 'DocumentEditorComponent',
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

  ngAfterViewInit(): void {
    // Utiliser setTimeout pour s'assurer que le DOM est complètement rendu
    setTimeout(() => {
      this.initEditor();
    }, 100);
  }

  ngOnDestroy(): void {
    // Quitter le document collaboratif
    if (this.documentId) {
      this.collaborativeService.leaveDocument(this.documentId);
    }

    // Supprimer tous les curseurs
    if (this.cursorManager) {
      this.cursorManager.removeAllCursors();
    }

    // Supprimer l'indicateur de sauvegarde
    if (this.saveIndicator && document.body.contains(this.saveIndicator)) {
      document.body.removeChild(this.saveIndicator);
    }
  }

  // Compteur de tentatives d'initialisation
  private initAttempts = 0;
  private maxInitAttempts = 3;

  /**
   * Initialise l'éditeur Quill
   */
  private initEditor(): void {
    // Limiter le nombre de tentatives pour éviter les boucles infinies
    if (this.initAttempts >= this.maxInitAttempts) {
      this.logger.error(`Abandon de l'initialisation de l'éditeur après ${this.initAttempts} tentatives`, {
        component: 'DocumentEditorComponent'
      });
      this.error.set('Impossible d\'initialiser l\'éditeur. Veuillez rafraîchir la page.');
      return;
    }

    this.initAttempts++;

    try {
      if (!this.editorElement || !this.editorElement.nativeElement) {
        this.logger.error('Élément d\'éditeur non trouvé', {
          component: 'DocumentEditorComponent',
          attempt: this.initAttempts
        });

        // Réessayer après un court délai si l'élément n'est pas trouvé
        if (this.initAttempts < this.maxInitAttempts) {
          setTimeout(() => {
            this.logger.info(`Tentative de réinitialisation de l'éditeur (${this.initAttempts + 1}/${this.maxInitAttempts})...`, {
              component: 'DocumentEditorComponent'
            });
            this.initEditor();
          }, 500);
        }
        return;
      }

      // Vérifier si l'élément est bien dans le DOM
      if (!document.body.contains(this.editorElement.nativeElement)) {
        this.logger.error('L\'élément d\'éditeur n\'est pas dans le DOM', {
          component: 'DocumentEditorComponent',
          attempt: this.initAttempts
        });

        // Réessayer après un court délai
        if (this.initAttempts < this.maxInitAttempts) {
          setTimeout(() => {
            this.logger.info(`Tentative de réinitialisation de l'éditeur (${this.initAttempts + 1}/${this.maxInitAttempts})...`, {
              component: 'DocumentEditorComponent'
            });
            this.initEditor();
          }, 500);
        }
        return;
      }

      this.logger.info('Initialisation de l\'éditeur Quill', {
        component: 'DocumentEditorComponent'
      });

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
        placeholder: 'Commencez à rédiger...'
      };

      // Créer l'instance de l'éditeur
      this.editor = new Quill(this.editorElement.nativeElement, options);
      this.logger.info('Éditeur Quill initialisé avec succès', {
        component: 'DocumentEditorComponent'
      });

      // Initialiser le gestionnaire de curseurs
      this.cursorManager = new CursorManager(this.editor, this.getCurrentUserId());

      // Créer l'indicateur de sauvegarde
      this.createSaveIndicator();

      // Configurer les événements de l'éditeur
      this.editor.on('text-change', (delta: any, _oldDelta: any, source: string) => {
        if (source === 'user' && this.documentId) {
          // Envoyer les modifications au service collaboratif
          const content = this.editor.root.innerHTML;
          this.collaborativeService.updateContent(this.documentId, content, delta);

          // Mettre en évidence les modifications locales
          this.highlightLocalChanges(delta);
        }
      });

      // Configurer les événements de sélection
      this.editor.on('selection-change', (range: any, _oldRange: any, source: string) => {
        if (source === 'user' && range && this.documentId) {
          // Envoyer la position du curseur au service collaboratif
          this.collaborativeService.updateCursorPosition(this.documentId, {
            index: range.index,
            length: range.length
          });
        }
      });

      this.isEditorReady = true;
      this.loadEditorContent();

      // Réinitialiser le compteur de tentatives après une initialisation réussie
      this.initAttempts = 0;
    } catch (error) {
      this.logger.error('Erreur lors de l\'initialisation de l\'éditeur', {
        component: 'DocumentEditorComponent',
        error,
        attempt: this.initAttempts
      });

      // Réessayer après un court délai en cas d'erreur, mais seulement si on n'a pas dépassé le nombre max de tentatives
      if (this.initAttempts < this.maxInitAttempts) {
        setTimeout(() => {
          this.logger.info(`Tentative de réinitialisation de l'éditeur après erreur (${this.initAttempts + 1}/${this.maxInitAttempts})...`, {
            component: 'DocumentEditorComponent'
          });
          this.initEditor();
        }, 1000);
      } else {
        this.error.set('Impossible d\'initialiser l\'éditeur. Veuillez rafraîchir la page.');
      }
    }
  }

  /**
   * Charge le document depuis le service
   */
  loadDocument(): void {
    // Vérifier que l'ID du document est valide
    if (!this.documentId || isNaN(this.documentId) || this.documentId <= 0) {
      console.error(`DocumentEditorComponent: Tentative de chargement avec un ID invalide: ${this.documentId}`);
      this.error.set(`ID de document invalide: ${this.documentId}`);
      this.isLoading.set(false);

      // Rediriger vers la liste des documents après un court délai
      setTimeout(() => {
        this.router.navigate(['/documents']);
      }, 3000);
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);

    console.log(`DocumentEditorComponent: Chargement du document ${this.documentId}`);

    this.documentService.getDocumentById(this.documentId).subscribe({
      next: (document) => {
        if (!document) {
          console.error(`DocumentEditorComponent: Document ${this.documentId} non trouvé ou undefined`);
          this.error.set('Document non trouvé. Veuillez réessayer plus tard.');
          this.isLoading.set(false);

          // Rediriger vers la liste des documents après un court délai
          setTimeout(() => {
            this.router.navigate(['/documents']);
          }, 3000);
          return;
        }

        console.log(`DocumentEditorComponent: Document ${this.documentId} chargé avec succès:`, document);
        this.document.set(document);

        // Vérifier si le document a une propriété title avant de l'utiliser
        if (document.title !== undefined) {
          this.documentTitle.set(document.title);
        } else {
          console.warn(`DocumentEditorComponent: Le document ${this.documentId} n'a pas de titre défini`);
          this.documentTitle.set('Document sans titre');
        }

        // Rejoindre le document collaboratif
        this.joinCollaborativeDocument();
      },
      error: (err) => {
        console.error(`DocumentEditorComponent: Erreur lors du chargement du document ${this.documentId}:`, err);
        this.error.set('Impossible de charger le document. Veuillez réessayer plus tard.');
        this.isLoading.set(false);

        // Rediriger vers la liste des documents après un court délai
        setTimeout(() => {
          this.router.navigate(['/documents']);
        }, 3000);
      }
    });
  }

  /**
   * Rejoint le document collaboratif
   */
  private joinCollaborativeDocument(): void {
    // Vérifier que l'ID du document est valide
    if (!this.documentId || isNaN(this.documentId) || this.documentId <= 0) {
      console.error(`DocumentEditorComponent: Tentative de rejoindre avec un ID invalide: ${this.documentId}`);
      this.error.set(`ID de document non valide pour l'édition collaborative: ${this.documentId}`);
      this.isLoading.set(false);

      // Rediriger vers la liste des documents après un court délai
      setTimeout(() => {
        this.router.navigate(['/documents']);
      }, 3000);
      return;
    }

    console.log(`DocumentEditorComponent: Tentative de rejoindre le document collaboratif ${this.documentId}`);

    this.collaborativeService.joinDocument(this.documentId).subscribe({
      next: (data) => {
        console.log(`DocumentEditorComponent: Document collaboratif ${this.documentId} rejoint:`, data);

        if (!data) {
          console.error(`DocumentEditorComponent: Données de document collaboratif non valides pour ${this.documentId}`);
          this.error.set('Erreur lors de la connexion au document collaboratif');
          this.isLoading.set(false);
          return;
        }

        // Mettre à jour le contenu de l'éditeur
        this.isContentLoaded = true;
        this.loadEditorContent();

        // Configurer les écouteurs pour les modifications en temps réel
        this.setupCollaborativeListeners();

        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(`DocumentEditorComponent: Erreur lors de la connexion au document collaboratif ${this.documentId}:`, err);
        this.error.set('Impossible de rejoindre l\'édition collaborative. Veuillez réessayer plus tard.');
        this.isLoading.set(false);

        // Ne pas rediriger ici, car le document a déjà été chargé avec succès
        // L'utilisateur pourra toujours voir et éditer le document, même sans la collaboration
      }
    });
  }

  /**
   * Charge le contenu dans l'éditeur
   */
  private loadEditorContent(): void {
    // Vérifier que toutes les conditions sont remplies avant de charger le contenu
    if (!this.isEditorReady) {
      console.warn('Éditeur non prêt pour charger le contenu');
      return;
    }

    if (!this.isContentLoaded) {
      console.warn('Contenu non chargé');
      return;
    }

    if (!this.document()) {
      console.warn('Document non disponible');
      return;
    }

    if (!this.editor) {
      console.error('Éditeur non initialisé');
      return;
    }

    // Récupérer le contenu du document (avec une valeur par défaut si undefined)
    const content = this.document()?.content || '';

    try {
      // Désactiver temporairement les événements pour éviter les boucles
      this.editor.off('text-change');

      // Charger le contenu
      this.editor.root.innerHTML = content;

      // Réactiver les événements avec une gestion d'erreur robuste
      this.editor.on('text-change', (delta: any, _oldDelta: any, source: string) => {
        if (source === 'user' && this.documentId) {
          try {
            const content = this.editor.root.innerHTML;

            // Vérifier que le delta a une structure valide
            if (!delta || !delta.ops) {
              this.logger.warn('Delta invalide détecté dans l\'événement text-change', {
                component: 'DocumentEditorComponent',
                delta
              });
              // Envoyer uniquement le contenu si le delta est invalide
              this.collaborativeService.updateContent(this.documentId, content);
            } else {
              // Envoyer le contenu et le delta
              this.collaborativeService.updateContent(this.documentId, content, delta);
            }
          } catch (error) {
            this.logger.error('Erreur lors de l\'envoi des modifications', {
              component: 'DocumentEditorComponent',
              error
            });

            // Tenter d'envoyer uniquement le contenu en cas d'erreur
            try {
              const content = this.editor.root.innerHTML;
              this.collaborativeService.updateContent(this.documentId, content);
            } catch (fallbackError) {
              this.logger.error('Erreur lors de la tentative de fallback', {
                component: 'DocumentEditorComponent',
                error: fallbackError
              });
            }
          }
        }
      });

      this.logger.info('Contenu chargé avec succès dans l\'éditeur', {
        component: 'DocumentEditorComponent',
        contentLength: content.length
      });
    } catch (error) {
      this.logger.error('Erreur lors du chargement du contenu dans l\'éditeur', {
        component: 'DocumentEditorComponent',
        error
      });
      this.error.set('Erreur lors du chargement du contenu. Veuillez rafraîchir la page.');

      // Tenter de récupérer en réinitialisant l'éditeur
      setTimeout(() => {
        try {
          this.initEditor();
        } catch (reinitError) {
          this.logger.error('Échec de la réinitialisation de l\'éditeur', {
            component: 'DocumentEditorComponent',
            error: reinitError
          });
        }
      }, 2000);
    }
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
        try {
          // Désactiver temporairement les événements pour éviter les boucles
          this.editor.off('text-change');

          // Vérifier si nous avons reçu un delta ou un contenu complet
          if (delta.ops && Array.isArray(delta.ops)) {
            // Appliquer le delta
            this.logger.debug('Application du delta reçu', {
              component: 'DocumentEditorComponent',
              deltaOps: delta.ops
            });
            this.editor.updateContents(delta.ops);
          } else if (delta.content) {
            // Appliquer le contenu complet
            this.logger.debug('Application du contenu complet reçu', {
              component: 'DocumentEditorComponent',
              contentLength: delta.content.length
            });
            this.editor.root.innerHTML = delta.content;
          } else {
            this.logger.warn('Delta reçu sans ops ni contenu', {
              component: 'DocumentEditorComponent',
              delta
            });
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
    });

    // Écouter les mouvements de curseur
    this.collaborativeService.onCursorMoved().subscribe(data => {
      if (!this.cursorManager) return;

      // Récupérer les informations de l'utilisateur
      const activeUsers = this.collaborativeService.activeUsers();
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

        this.logger.debug('Curseur mis à jour', {
          component: 'DocumentEditorComponent',
          userId: data.userId,
          username: user.username,
          position: data.position
        });
      }
    });

    // Écouter les sauvegardes de document
    this.collaborativeService.onDocumentSaved().subscribe(data => {
      this.logger.debug('Document sauvegardé', {
        component: 'DocumentEditorComponent',
        documentId: data.documentId,
        savedAt: data.savedAt,
        versionNumber: data.versionNumber
      });
    });
  }

  /**
   * Sauvegarde le document manuellement
   */
  saveDocument(): void {
    if (!this.editor || !this.documentId) {
      this.logger.error('Éditeur ou ID de document non disponible', {
        component: 'DocumentEditorComponent',
        documentId: this.documentId
      });
      return;
    }

    // Pas besoin de définir isSaving ici, car collaborativeService.saveDocument() le fait déjà

    // Récupérer le titre actuel
    const title = this.documentTitle();

    // Récupérer le contenu et vérifier s'il est vide
    let content = this.editor.root.innerHTML;

    // Vérifier si le contenu est vide
    if (!content || content.trim() === '') {
      this.logger.warn('Contenu vide détecté', {
        component: 'DocumentEditorComponent',
        documentId: this.documentId
      });
      // Si le contenu est vide, utiliser un contenu par défaut pour éviter les problèmes
      const defaultContent = '<p>Document vide</p>';
      // Mettre à jour l'éditeur avec le contenu par défaut
      this.editor.root.innerHTML = defaultContent;
      // Mettre à jour la variable content
      content = defaultContent;
    }

    // Log du contenu à sauvegarder
    this.logger.debug('Sauvegarde du document', {
      component: 'DocumentEditorComponent',
      documentId: this.documentId,
      contentLength: content.length,
      contentPreview: content.substring(0, 50)
    });

    // Mettre à jour le document local avec le contenu actuel
    const currentDoc = this.document();
    if (currentDoc) {
      currentDoc.content = content;
      this.document.set(currentDoc);
      this.logger.debug('Document local mis à jour', {
        component: 'DocumentEditorComponent',
        documentId: this.documentId,
        contentLength: content.length
      });

      // Mettre également à jour le document actif dans le service collaboratif
      this.collaborativeService.updateContent(this.documentId, content);
      this.logger.debug('Document actif mis à jour dans le service collaboratif', {
        component: 'DocumentEditorComponent',
        documentId: this.documentId
      });
    }

    // Afficher un message de sauvegarde en cours
    const saveMessage = document.createElement('div');
    saveMessage.className = 'save-message';
    saveMessage.textContent = 'Sauvegarde en cours...';
    saveMessage.style.position = 'fixed';
    saveMessage.style.bottom = '20px';
    saveMessage.style.right = '20px';
    saveMessage.style.padding = '10px 20px';
    saveMessage.style.backgroundColor = '#4CAF50';
    saveMessage.style.color = 'white';
    saveMessage.style.borderRadius = '4px';
    saveMessage.style.zIndex = '1000';
    document.body.appendChild(saveMessage);

    // Mettre à jour le titre si nécessaire
    let titleUpdatePromise = Promise.resolve();
    if (title !== this.document()?.title) {
      titleUpdatePromise = new Promise<void>((resolve) => {
        this.logger.info('Mise à jour du titre du document', {
          component: 'DocumentEditorComponent',
          documentId: this.documentId,
          oldTitle: this.document()?.title,
          newTitle: title
        });

        this.documentService.updateDocument(this.documentId, { title }).subscribe({
          next: () => {
            this.logger.info('Titre mis à jour avec succès', {
              component: 'DocumentEditorComponent',
              documentId: this.documentId
            });
            resolve();
          },
          error: (err) => {
            this.logger.error('Erreur lors de la mise à jour du titre', {
              component: 'DocumentEditorComponent',
              documentId: this.documentId,
              error: err
            });
            // Ne pas rejeter la promesse pour continuer avec la sauvegarde du contenu
            resolve();
          }
        });
      });
    }

    // Attendre que la mise à jour du titre soit terminée avant de sauvegarder le contenu
    titleUpdatePromise.then(() => {
      // Sauvegarder le contenu
      this.collaborativeService.saveDocument(this.documentId).subscribe({
        next: (data) => {
          this.logger.info('Document sauvegardé avec succès', {
            component: 'DocumentEditorComponent',
            documentId: this.documentId,
            versionNumber: data.versionNumber
          });

          // Mettre à jour le message de sauvegarde
          saveMessage.textContent = 'Document sauvegardé !';
          saveMessage.style.backgroundColor = '#4CAF50';

          // Supprimer le message après 3 secondes
          setTimeout(() => {
            if (document.body.contains(saveMessage)) {
              document.body.removeChild(saveMessage);
            }
          }, 3000);

          // Vérifier que le document a bien été sauvegardé
          this.verifyDocumentSaved();
        },
        error: (err) => {
          this.logger.error('Erreur lors de la sauvegarde du document', {
            component: 'DocumentEditorComponent',
            documentId: this.documentId,
            error: err
          });

          // Mettre à jour le message d'erreur
          saveMessage.textContent = 'Erreur lors de la sauvegarde. Nouvelle tentative...';
          saveMessage.style.backgroundColor = '#f44336';

          // Tenter une sauvegarde via HTTP directement
          this.fallbackSaveDocument(content, title, saveMessage);
        }
      });
    });
  }

  /**
   * Sauvegarde de secours via HTTP direct
   */
  private fallbackSaveDocument(content: string, title: string, saveMessage: HTMLElement): void {
    console.log('📄 [DocumentEditor] Fallback: Sauvegarde via HTTP direct');

    // Vérifier si le contenu est vide
    if (!content || content.trim() === '') {
      console.warn('📄 [DocumentEditor] Alerte: Contenu vide détecté dans fallback');
      // Si le contenu est vide, utiliser un contenu par défaut pour éviter les problèmes
      content = '<p>Document vide</p>';
    }

    // Log du contenu à sauvegarder
    console.log(`📄 [DocumentEditor] Fallback: ${content.length} caractères`);
    console.log(`📝 [DocumentEditor] Contenu fallback: ${content.substring(0, 50)}...`);

    this.documentService.updateDocument(this.documentId, {
      title,
      content
    }).subscribe({
      next: (data) => {
        console.log('Document sauvegardé avec succès via HTTP direct:', data);

        // Mettre à jour le message de sauvegarde
        saveMessage.textContent = 'Document sauvegardé (mode secours) !';
        saveMessage.style.backgroundColor = '#FF9800';

        // Mettre à jour l'état de sauvegarde
        this.isSaving.set(false);
        this.lastSaved.set(new Date());

        // Supprimer le message après 3 secondes
        setTimeout(() => {
          if (document.body.contains(saveMessage)) {
            document.body.removeChild(saveMessage);
          }
        }, 3000);
      },
      error: (err) => {
        console.error('Erreur lors de la sauvegarde via HTTP direct:', err);

        // Mettre à jour le message d'erreur
        saveMessage.textContent = 'Échec de la sauvegarde. Veuillez réessayer.';
        saveMessage.style.backgroundColor = '#f44336';

        // Supprimer le message après 5 secondes
        setTimeout(() => {
          if (document.body.contains(saveMessage)) {
            document.body.removeChild(saveMessage);
          }
        }, 5000);

        this.isSaving.set(false);
      }
    });
  }

  /**
   * Vérifie que le document a bien été sauvegardé
   */
  private verifyDocumentSaved(): void {
    // Attendre un peu pour s'assurer que les modifications ont été appliquées
    setTimeout(() => {
      this.documentService.getDocumentById(this.documentId).subscribe({
        next: (document) => {
          if (document) {
            console.log('DocumentEditorComponent: Document vérifié avec succès');
            // Mettre à jour le document local si nécessaire
            this.document.set(document);
          } else {
            console.warn('DocumentEditorComponent: Document non trouvé lors de la vérification');
          }
        },
        error: (error) => {
          console.error('Erreur lors de la vérification du document:', error);
        }
      });
    }, 1000);
  }

  /**
   * Crée l'indicateur de sauvegarde
   */
  private createSaveIndicator(): void {
    // Supprimer l'ancien indicateur s'il existe
    if (this.saveIndicator && document.body.contains(this.saveIndicator)) {
      document.body.removeChild(this.saveIndicator);
    }

    // Créer le nouvel indicateur
    this.saveIndicator = document.createElement('div');
    this.saveIndicator.className = 'save-indicator';
    this.saveIndicator.innerHTML = '<span>Prêt</span>';
    document.body.appendChild(this.saveIndicator);

    // Masquer l'indicateur après 3 secondes
    setTimeout(() => {
      if (this.saveIndicator) {
        this.saveIndicator.style.opacity = '0';
      }
    }, 3000);

    // Configurer les souscriptions pour mettre à jour l'indicateur
    this.setupSaveIndicatorSubscriptions();
  }

  /**
   * Configure les souscriptions pour l'indicateur de sauvegarde
   */
  private setupSaveIndicatorSubscriptions(): void {
    // Créer une référence locale pour éviter les problèmes de contexte
    const component = this;

    // Utiliser un intervalle pour vérifier périodiquement l'état de sauvegarde
    // au lieu d'utiliser effect() qui peut causer des boucles infinies
    const checkInterval = setInterval(() => {
      if (!component.saveIndicator || !document.body.contains(component.saveIndicator)) {
        // Arrêter l'intervalle si l'indicateur n'existe plus
        clearInterval(checkInterval);
        return;
      }

      const isSaving = component.collaborativeService.isSaving();
      const lastSaved = component.collaborativeService.lastSaved();
      component.updateSaveIndicator(isSaving, lastSaved);
    }, 500); // Vérifier toutes les 500ms

    // Nettoyer l'intervalle lors de la destruction du composant
    this.ngOnDestroy = (function() {
      const originalOnDestroy = component.ngOnDestroy;
      return function() {
        clearInterval(checkInterval);
        if (originalOnDestroy) {
          originalOnDestroy.apply(component);
        }
      };
    })();
  }

  /**
   * Met à jour l'indicateur de sauvegarde
   * @param isSaving Indique si une sauvegarde est en cours
   * @param lastSaved Date de la dernière sauvegarde
   */
  private updateSaveIndicator(isSaving: boolean, lastSaved: Date | null): void {
    if (!this.saveIndicator) return;

    if (isSaving) {
      this.saveIndicator.className = 'save-indicator saving';
      this.saveIndicator.innerHTML = '<span>Sauvegarde en cours...</span>';
      this.saveIndicator.style.opacity = '1';
    } else if (lastSaved) {
      const formattedTime = this.formatDate(lastSaved);
      this.saveIndicator.className = 'save-indicator saved';
      this.saveIndicator.innerHTML = `<span>Sauvegardé à ${formattedTime}</span>`;
      this.saveIndicator.style.opacity = '1';

      // Masquer l'indicateur après 3 secondes
      setTimeout(() => {
        if (this.saveIndicator) {
          this.saveIndicator.style.opacity = '0';
        }
      }, 3000);
    }
  }

  /**
   * Met en évidence les modifications locales
   * @param delta Delta de modification
   */
  private highlightLocalChanges(delta: any): void {
    if (!delta || !delta.ops || !this.editor) return;

    // Parcourir les opérations du delta
    let index = 0;
    delta.ops.forEach((op: any) => {
      if (op.insert) {
        // Texte inséré
        const length = op.insert.length || 1;
        this.highlightRange(index, length, '#e6f7ff'); // Bleu clair
        index += length;
      } else if (op.delete) {
        // Texte supprimé (rien à faire car il n'existe plus)
      } else if (op.retain) {
        // Texte conservé
        index += op.retain;
      }
    });
  }

  /**
   * Met en évidence une plage de texte
   * @param index Index de début
   * @param length Longueur
   * @param color Couleur
   */
  private highlightRange(index: number, length: number, color: string): void {
    try {
      // Appliquer une classe temporaire
      this.editor.formatText(index, length, {
        'background-color': color,
        'class': 'ql-recent-change'
      });

      // Supprimer la mise en évidence après 2 secondes
      setTimeout(() => {
        this.editor.formatText(index, length, {
          'background-color': false
        });
      }, 2000);
    } catch (error) {
      console.error('Erreur lors de la mise en évidence:', error);
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
   * @returns Date formatée
   */
  formatDate(date: Date | null): string {
    if (!date) return 'Jamais';

    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
