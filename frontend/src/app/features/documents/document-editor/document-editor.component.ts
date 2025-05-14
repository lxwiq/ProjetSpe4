import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { DocumentService } from '../../../core/services/document.service';
import { CollaborativeDocumentService } from '../../../core/services/collaborative-document.service';
import { AuthService } from '../../../core/services/auth.service';
import { Document, ActiveDocumentUser, DocumentCollaborator } from '../../../core/models/document.model';
import { DocumentCollaboratorsComponent } from '../document-collaborators/document-collaborators.component';

// Déclaration pour Quill
declare var Quill: any;

@Component({
  selector: 'app-document-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, DocumentCollaboratorsComponent],
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

  // Éditeur Quill
  editor: any;
  documentId!: number;
  private isEditorReady = false;
  private isContentLoaded = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private documentService: DocumentService,
    public collaborativeService: CollaborativeDocumentService,
    private authService: AuthService
  ) {
    // Réagir aux changements d'état du service collaboratif
    effect(() => {
      this.isSaving.set(this.collaborativeService.isSaving());
    });

    effect(() => {
      const lastSaved = this.collaborativeService.lastSaved();
      if (lastSaved) {
        this.lastSaved.set(lastSaved);
      }
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.documentId = +id;
        this.loadDocument();
      } else {
        this.error.set('ID de document non valide');
        this.isLoading.set(false);
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
  }

  /**
   * Initialise l'éditeur Quill
   */
  private initEditor(): void {
    try {
      if (!this.editorElement || !this.editorElement.nativeElement) {
        console.error('Élément d\'éditeur non trouvé');

        // Réessayer après un court délai si l'élément n'est pas trouvé
        setTimeout(() => {
          console.log('Tentative de réinitialisation de l\'éditeur...');
          this.initEditor();
        }, 500);

        return;
      }

      // Vérifier si l'élément est bien dans le DOM
      if (!document.body.contains(this.editorElement.nativeElement)) {
        console.error('L\'élément d\'éditeur n\'est pas dans le DOM');

        // Réessayer après un court délai
        setTimeout(() => {
          console.log('Tentative de réinitialisation de l\'éditeur...');
          this.initEditor();
        }, 500);

        return;
      }

      console.log('Initialisation de l\'éditeur Quill avec l\'élément:', this.editorElement.nativeElement);

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
      console.log('Éditeur Quill initialisé avec succès');

      // Configurer les événements de l'éditeur
      this.editor.on('text-change', (delta: any, oldDelta: any, source: string) => {
        if (source === 'user' && this.documentId) {
          // Envoyer les modifications au service collaboratif
          const content = this.editor.root.innerHTML;
          this.collaborativeService.updateContent(this.documentId, content, delta);
        }
      });

      // Configurer les événements de sélection
      this.editor.on('selection-change', (range: any, oldRange: any, source: string) => {
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
    } catch (error) {
      console.error('Erreur lors de l\'initialisation de l\'éditeur:', error);

      // Réessayer après un court délai en cas d'erreur
      setTimeout(() => {
        console.log('Tentative de réinitialisation de l\'éditeur après erreur...');
        this.initEditor();
      }, 1000);
    }
  }

  /**
   * Charge le document depuis le service
   */
  loadDocument(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.documentService.getDocumentById(this.documentId).subscribe({
      next: (document) => {
        if (!document) {
          console.error('Document non trouvé ou undefined');
          this.error.set('Document non trouvé. Veuillez réessayer plus tard.');
          this.isLoading.set(false);
          return;
        }

        this.document.set(document);

        // Vérifier si le document a une propriété title avant de l'utiliser
        if (document.title !== undefined) {
          this.documentTitle.set(document.title);
        } else {
          console.warn('Le document n\'a pas de titre défini');
          this.documentTitle.set('Document sans titre');
        }

        // Rejoindre le document collaboratif
        this.joinCollaborativeDocument();
      },
      error: (err) => {
        console.error('Erreur lors du chargement du document:', err);
        this.error.set('Impossible de charger le document. Veuillez réessayer plus tard.');
        this.isLoading.set(false);
      }
    });
  }

  /**
   * Rejoint le document collaboratif
   */
  private joinCollaborativeDocument(): void {
    if (!this.documentId) {
      console.error('ID de document non valide pour rejoindre le document collaboratif');
      this.error.set('ID de document non valide');
      this.isLoading.set(false);
      return;
    }

    this.collaborativeService.joinDocument(this.documentId).subscribe({
      next: (data) => {
        console.log('Document collaboratif rejoint:', data);

        if (!data) {
          console.error('Données de document collaboratif non valides');
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
        console.error('Erreur lors de la connexion au document collaboratif:', err);
        this.error.set('Impossible de rejoindre l\'édition collaborative. Veuillez réessayer plus tard.');
        this.isLoading.set(false);
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

      // Réactiver les événements
      this.editor.on('text-change', (delta: any, oldDelta: any, source: string) => {
        if (source === 'user' && this.documentId) {
          const content = this.editor.root.innerHTML;
          this.collaborativeService.updateContent(this.documentId, content, delta);
        }
      });
    } catch (error) {
      console.error('Erreur lors du chargement du contenu dans l\'éditeur:', error);
      this.error.set('Erreur lors du chargement du contenu. Veuillez rafraîchir la page.');
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
        // Désactiver temporairement les événements pour éviter les boucles
        this.editor.off('text-change');

        // Appliquer le delta
        this.editor.updateContents(delta.ops);

        // Réactiver les événements
        this.editor.on('text-change', (delta: any, oldDelta: any, source: string) => {
          if (source === 'user' && this.documentId) {
            const content = this.editor.root.innerHTML;
            this.collaborativeService.updateContent(this.documentId, content, delta);
          }
        });
      }
    });

    // Écouter les mouvements de curseur
    this.collaborativeService.onCursorMoved().subscribe(data => {
      // Implémenter l'affichage des curseurs des autres utilisateurs
      console.log('Curseur déplacé:', data);
    });

    // Écouter les sauvegardes de document
    this.collaborativeService.onDocumentSaved().subscribe(data => {
      console.log('Document sauvegardé:', data);
    });
  }

  /**
   * Sauvegarde le document manuellement
   */
  saveDocument(): void {
    if (!this.editor || !this.documentId) {
      console.error('DocumentEditorComponent: Éditeur ou ID de document non disponible');
      return;
    }

    // Pas besoin de définir isSaving ici, car collaborativeService.saveDocument() le fait déjà

    // Récupérer le titre actuel
    const title = this.documentTitle();

    // Récupérer le contenu et vérifier s'il est vide
    let content = this.editor.root.innerHTML;

    // Vérifier si le contenu est vide
    if (!content || content.trim() === '') {
      console.warn('📄 [DocumentEditor] Alerte: Contenu vide détecté');
      // Si le contenu est vide, utiliser un contenu par défaut pour éviter les problèmes
      const defaultContent = '<p>Document vide</p>';
      // Mettre à jour l'éditeur avec le contenu par défaut
      this.editor.root.innerHTML = defaultContent;
      // Mettre à jour la variable content
      content = defaultContent;
    }

    // Log du contenu à sauvegarder
    console.log(`📄 [DocumentEditor] Sauvegarde: ${content.length} caractères`);
    console.log(`📝 [DocumentEditor] Contenu: ${content.substring(0, 50)}...`);

    // Mettre à jour le document local avec le contenu actuel
    const currentDoc = this.document();
    if (currentDoc) {
      currentDoc.content = content;
      this.document.set(currentDoc);
      console.log(`DocumentEditorComponent: Document local mis à jour avec le contenu (${content.length} caractères)`);

      // Mettre également à jour le document actif dans le service collaboratif
      this.collaborativeService.updateContent(this.documentId, content);
      console.log(`DocumentEditorComponent: Document actif mis à jour dans le service collaboratif`);
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
      titleUpdatePromise = new Promise<void>((resolve, reject) => {
        this.documentService.updateDocument(this.documentId, { title }).subscribe({
          next: () => {
            console.log('Titre mis à jour avec succès');
            resolve();
          },
          error: (err) => {
            console.error('Erreur lors de la mise à jour du titre:', err);
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
          console.log('Document sauvegardé avec succès:', data);

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
          console.error('Erreur lors de la sauvegarde du document:', err);

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
