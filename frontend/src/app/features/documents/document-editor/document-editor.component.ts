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
    if (!this.editor || !this.documentId) return;

    this.isSaving.set(true);

    const content = this.editor.root.innerHTML;
    const title = this.documentTitle();

    // Mettre à jour le titre si nécessaire
    if (title !== this.document()?.title) {
      this.documentService.updateDocument(this.documentId, { title }).subscribe({
        error: (err) => {
          console.error('Erreur lors de la mise à jour du titre:', err);
        }
      });
    }

    // Sauvegarder le contenu
    this.collaborativeService.saveDocument(this.documentId).subscribe({
      next: (data) => {
        console.log('Document sauvegardé avec succès:', data);
        this.isSaving.set(false);
      },
      error: (err) => {
        console.error('Erreur lors de la sauvegarde du document:', err);
        this.isSaving.set(false);
        alert('Erreur lors de la sauvegarde du document. Veuillez réessayer.');
      }
    });
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
