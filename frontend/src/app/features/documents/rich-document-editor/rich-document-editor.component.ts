import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DocumentsService } from '../../../core/services/documents.service';
import { Document } from '../../../core/models/document.model';
import { DocumentCollaboratorsComponent } from '../document-collaborators/document-collaborators.component';
import { Subscription, interval, Subject, debounceTime, throttleTime } from 'rxjs';
import { QuillModule, QuillEditorComponent } from 'ngx-quill';
import { quillConfig, QuillConfig } from '../../../core/config/quill-config';
import { SocketService } from '../../../core/services/socket.service';
import { AuthService } from '../../../core/services/auth.service';
import Quill from 'quill';
import QuillCursors from 'quill-cursors';

// Enregistrer le module QuillCursors
Quill.register('modules/cursors', QuillCursors);

// Interface pour les informations de curseur
interface CursorInfo {
  id: number;
  name: string;
  color: string;
  index: number;
  range?: { index: number, length: number } | null;
  isTyping?: boolean;
}

@Component({
  selector: 'app-rich-document-editor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    QuillModule,
    DocumentCollaboratorsComponent
  ],
  templateUrl: './rich-document-editor.component.html',
  styleUrls: ['./rich-document-editor.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RichDocumentEditorComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(QuillEditorComponent) editor!: QuillEditorComponent;

  documentId!: number;
  document: Document | null = null;
  content: string = '';
  title: string = '';

  isLoading: boolean = false;
  isSaving: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  showCollaborators: boolean = false;

  // Informations sur les collaborateurs actifs
  activeCollaborators: { [userId: number]: CursorInfo } = {};

  // Référence au module cursors de Quill
  private cursors: any;

  // Référence à l'instance de Quill
  private quill: any;

  // Sujets pour limiter les émissions d'événements
  private cursorMoveSubject = new Subject<any>();
  private selectionChangeSubject = new Subject<any>();
  private typingSubject = new Subject<boolean>();

  // Abonnements aux événements
  private cursorSubscription: Subscription | null = null;
  private selectionSubscription: Subscription | null = null;
  private typingSubscription: Subscription | null = null;
  private socketSubscriptions: Subscription[] = [];

  // Utiliser directement la configuration de Quill qui inclut déjà le module cursors
  quillConfig: QuillConfig = quillConfig;

  private autoSaveInterval: Subscription | null = null;
  private lastSavedContent: string = '';
  private lastSavedTitle: string = '';

  // ID de l'utilisateur actuel
  private currentUserId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private documentsService: DocumentsService,
    private socketService: SocketService,
    private authService: AuthService
  ) {
    // Récupérer l'ID de l'utilisateur actuel
    const currentUser = this.authService.getCurrentUser();
    this.currentUserId = currentUser ? currentUser.id : 0;

    console.log('ID de l\'utilisateur actuel:', this.currentUserId);

    // Vérifier que l'ID de l'utilisateur est correctement défini
    if (!this.currentUserId) {
      console.error('ID de l\'utilisateur non défini. Cela peut causer des problèmes avec la collaboration en temps réel.');
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.documentId = +params['id'];
      this.loadDocument();

      // Configurer les sujets pour limiter les émissions d'événements
      this.setupEventThrottling();
    });
  }

  ngAfterViewInit(): void {
    // Attendre que l'éditeur soit initialisé
    if (this.editor && this.editor.quillEditor) {
      this.setupQuillEditor();
    } else {
      // Si l'éditeur n'est pas encore prêt, attendre qu'il le soit
      const editorReadyInterval = setInterval(() => {
        if (this.editor && this.editor.quillEditor) {
          this.setupQuillEditor();
          clearInterval(editorReadyInterval);
        }
      }, 100);
    }
  }

  ngOnDestroy(): void {
    // Nettoyer les abonnements
    if (this.autoSaveInterval) {
      this.autoSaveInterval.unsubscribe();
    }

    if (this.cursorSubscription) {
      this.cursorSubscription.unsubscribe();
    }

    if (this.selectionSubscription) {
      this.selectionSubscription.unsubscribe();
    }

    if (this.typingSubscription) {
      this.typingSubscription.unsubscribe();
    }

    // Nettoyer les abonnements socket
    this.socketSubscriptions.forEach(sub => sub.unsubscribe());

    // Quitter la salle du document
    this.socketService.emit('document:leave', { documentId: this.documentId });
  }

  /**
   * Configure l'éditeur Quill et les curseurs
   */
  private setupQuillEditor(): void {
    try {
      // Récupérer l'instance de Quill
      this.quill = this.editor.quillEditor;

      console.log('Quill instance:', this.quill);

      // Enregistrer manuellement le module cursors
      Quill.register('modules/cursors', QuillCursors);

      // Créer une nouvelle instance de QuillCursors directement
      this.cursors = new QuillCursors(this.quill);

      console.log('Module cursors créé manuellement:', this.cursors);

      // Configurer les événements de l'éditeur
      this.setupEditorEvents();

      // Rejoindre la salle du document
      this.joinDocument();
    } catch (error) {
      console.error('Erreur lors de l\'initialisation de l\'éditeur:', error);
    }
  }

  /**
   * Configure les sujets pour limiter les émissions d'événements
   */
  private setupEventThrottling(): void {
    // Limiter les mises à jour de curseur à 100ms
    this.cursorSubscription = this.cursorMoveSubject
      .pipe(throttleTime(100))
      .subscribe(range => this.emitCursorPosition(range));

    // Limiter les mises à jour de sélection à 100ms
    this.selectionSubscription = this.selectionChangeSubject
      .pipe(throttleTime(100))
      .subscribe(range => this.emitSelectionChange(range));

    // Limiter les notifications de frappe à 500ms
    this.typingSubscription = this.typingSubject
      .pipe(debounceTime(500))
      .subscribe(isTyping => this.emitTypingStatus(isTyping));
  }

  /**
   * Configure les événements de l'éditeur Quill
   */
  private setupEditorEvents(): void {
    if (!this.quill) {
      console.error('Instance Quill non disponible lors de la configuration des événements');
      return;
    }

    try {
      // Événement de changement de sélection
      this.quill.on('selection-change', (range: any, oldRange: any, source: string) => {
        console.log('Événement selection-change:', { range, oldRange, source });
        if (source === 'user' && range) {
          // Émettre la position du curseur
          this.cursorMoveSubject.next(range);

          // Si la sélection a une longueur, émettre également la sélection
          if (range.length > 0) {
            this.selectionChangeSubject.next(range);
          }
        }
      });

      // Événement de changement de texte
      this.quill.on('text-change', (delta: any, oldDelta: any, source: string) => {
        console.log('Événement text-change:', { delta, source });
        if (source === 'user') {
          // Indiquer que l'utilisateur est en train de taper
          this.typingSubject.next(true);

          // Vérifier que le delta est valide
          if (delta && delta.ops) {
            console.log('Émission du delta au serveur:', delta);

            // Émettre le delta au serveur
            this.socketService.emit('document:update', {
              documentId: this.documentId,
              delta: delta
            });
          } else {
            console.error('Delta invalide:', delta);
          }
        }
      });

      console.log('Événements de l\'éditeur configurés avec succès');
    } catch (error) {
      console.error('Erreur lors de la configuration des événements de l\'éditeur:', error);
    }
  }

  /**
   * Rejoint la salle du document et configure les événements socket
   */
  private joinDocument(): void {
    console.log('Tentative de rejoindre le document:', this.documentId);

    // Rejoindre la salle du document avec accusé de réception
    this.socketService.emitWithAck<any>('document:join', { documentId: this.documentId })
      .then(response => {
        console.log('Document rejoint avec succès:', response);
        if (response && response.activeUsers) {
          console.log('Utilisateurs actifs:', response.activeUsers);
        }
      })
      .catch(error => {
        console.error('Erreur lors de la tentative de rejoindre le document:', error);
      });

    // Écouter les événements de curseur
    this.listenForCursorEvents();
  }

  loadDocument(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.documentsService.getDocumentById(this.documentId).subscribe({
      next: (document) => {
        this.document = document;
        this.title = document.title;
        this.content = document.content || '';
        this.lastSavedContent = this.content;
        this.lastSavedTitle = this.title;

        this.setupAutoSave();
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement du document';
        this.isLoading = false;
        console.error('Error loading document:', error);
      }
    });
  }

  setupAutoSave(): void {
    // Configurer l'auto-sauvegarde toutes les 30 secondes
    if (this.autoSaveInterval) {
      this.autoSaveInterval.unsubscribe();
    }

    this.autoSaveInterval = interval(30000).subscribe(() => {
      this.autoSave();
    });
  }

  autoSave(): void {
    // Ne sauvegarder que si le contenu a changé
    if (this.content !== this.lastSavedContent || this.title !== this.lastSavedTitle) {
      this.saveDocument(true);
    }
  }

  saveDocument(isAutoSave: boolean = false): void {
    if (!isAutoSave) {
      this.isSaving = true;
    }

    this.errorMessage = '';
    this.successMessage = '';

    this.documentsService.updateDocument(this.documentId, {
      title: this.title,
      content: this.content
    }).subscribe({
      next: (updatedDocument) => {
        this.lastSavedContent = this.content;
        this.lastSavedTitle = this.title;

        if (!isAutoSave) {
          this.successMessage = 'Document sauvegardé avec succès';
          this.isSaving = false;
        }
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la sauvegarde du document';
        if (!isAutoSave) {
          this.isSaving = false;
        }
        console.error('Error saving document:', error);
      }
    });
  }

  toggleCollaborators(): void {
    this.showCollaborators = !this.showCollaborators;
  }

  goBack(): void {
    this.router.navigate(['/documents']);
  }

  createNewDocument(): void {
    this.router.navigate(['/documents']);
  }

  onContentChanged(event: any): void {
    // Vous pouvez ajouter une logique supplémentaire ici si nécessaire
    console.log('Content changed:', event);
  }

  /**
   * Écoute les événements de curseur des autres utilisateurs
   */
  private listenForCursorEvents(): void {
    console.log('Configuration des écouteurs d\'événements de curseur');

    // Écouter les événements de curseur
    const cursorUpdateSub = this.socketService.on<any>('document:cursor-update').subscribe(data => {
      console.log('Événement de curseur reçu:', data);
      if (data.userId !== this.currentUserId) {
        this.updateCollaboratorCursor(data);
      }
    });

    // Écouter les événements de sélection
    const selectionUpdateSub = this.socketService.on<any>('document:selection-update').subscribe(data => {
      console.log('Événement de sélection reçu:', data);
      if (data.userId !== this.currentUserId) {
        this.updateCollaboratorSelection(data);
      }
    });

    // Écouter les événements de frappe
    const typingUpdateSub = this.socketService.on<any>('document:typing').subscribe(data => {
      console.log('Événement de frappe reçu:', data);
      if (data.userId !== this.currentUserId) {
        this.updateCollaboratorTypingStatus(data);
      }
    });

    // Écouter les événements d'arrivée d'utilisateur
    const userJoinedSub = this.socketService.on<any>('document:user-joined').subscribe(data => {
      console.log('Événement d\'arrivée d\'utilisateur reçu:', data);
      this.handleUserJoined(data);
    });

    // Écouter les événements de départ d'utilisateur
    const userLeftSub = this.socketService.on<any>('document:user-left').subscribe(data => {
      console.log('Événement de départ d\'utilisateur reçu:', data);
      this.handleUserLeft(data);
    });

    // Écouter les événements de changement de contenu
    const contentChangedSub = this.socketService.on<any>('document:content-changed').subscribe(data => {
      console.log('Événement de changement de contenu reçu:', data);

      // Vérifier si l'événement contient un ID d'utilisateur
      if (!data.userId) {
        console.error('Événement de changement de contenu sans ID d\'utilisateur:', data);
        return;
      }

      // Afficher l'ID de l'utilisateur actuel et l'ID de l'utilisateur qui a émis l'événement
      console.log('ID utilisateur actuel:', this.currentUserId, 'ID utilisateur émetteur:', data.userId);

      // Ne pas mettre à jour le contenu si c'est nous qui avons fait la modification
      if (data.userId !== this.currentUserId && this.quill) {
        try {
          if (data.delta) {
            // Vérifier que le delta est valide
            if (data.delta && data.delta.ops) {
              // Mettre à jour le contenu avec le delta sans déclencher d'événements
              console.log('Application du delta:', data.delta);
              this.quill.updateContents(data.delta, 'api');
            } else {
              console.error('Delta invalide reçu:', data.delta);
            }
          } else if (data.content) {
            // Mettre à jour le contenu complet sans déclencher d'événements
            console.log('Mise à jour du contenu complet');
            this.quill.setContents(data.content, 'api');
          } else {
            console.error('Événement de changement de contenu sans delta ni contenu:', data);
          }
        } catch (error) {
          console.error('Erreur lors de la mise à jour du contenu:', error);
        }
      } else {
        console.log('Ignorer l\'événement car il provient de l\'utilisateur actuel ou l\'éditeur n\'est pas initialisé');
      }
    });

    // Stocker les abonnements pour les nettoyer plus tard
    this.socketSubscriptions.push(
      cursorUpdateSub,
      selectionUpdateSub,
      typingUpdateSub,
      userJoinedSub,
      userLeftSub,
      contentChangedSub
    );
  }

  /**
   * Émet la position du curseur aux autres utilisateurs
   */
  private emitCursorPosition(range: any): void {
    if (!range) return;

    const data = {
      documentId: this.documentId,
      index: range.index,
      length: range.length || 0
    };

    console.log('Émission de la position du curseur:', data);
    this.socketService.emit('document:cursor-update', data);
  }

  /**
   * Émet la sélection aux autres utilisateurs
   */
  private emitSelectionChange(range: any): void {
    if (!range || range.length === 0) return;

    const data = {
      documentId: this.documentId,
      range: {
        index: range.index,
        length: range.length
      }
    };

    console.log('Émission de la sélection:', data);
    this.socketService.emit('document:selection-update', data);
  }

  /**
   * Émet le statut de frappe aux autres utilisateurs
   */
  private emitTypingStatus(isTyping: boolean): void {
    const data = {
      documentId: this.documentId,
      isTyping
    };

    console.log('Émission du statut de frappe:', data);
    this.socketService.emit('document:typing', data);
  }

  /**
   * Met à jour le curseur d'un collaborateur
   */
  private updateCollaboratorCursor(data: any): void {
    const { userId, index, username, color } = data;

    console.log('Mise à jour du curseur pour l\'utilisateur:', userId, username);

    try {
      // Si le module cursors n'est pas disponible, essayer de le créer
      if (!this.cursors && this.quill) {
        console.log('Tentative de création du module cursors');
        try {
          this.cursors = new QuillCursors(this.quill);
          console.log('Module cursors créé avec succès:', this.cursors);
        } catch (error) {
          console.error('Erreur lors de la création du module cursors:', error);
        }
      }

      // Si c'est la première fois que nous voyons ce collaborateur, créer son curseur
      if (!this.activeCollaborators[userId]) {
        console.log('Création d\'un nouveau curseur pour:', username);

        const userColor = color || this.getRandomColor();

        this.activeCollaborators[userId] = {
          id: userId,
          name: username,
          color: userColor,
          index: index
        };

        // Créer le curseur dans l'éditeur
        if (this.cursors) {
          console.log('Création du curseur dans l\'éditeur pour:', username);
          this.cursors.createCursor(userId.toString(), username, userColor);
        } else {
          console.error('Module cursors non disponible lors de la création du curseur');
        }
      }

      // Mettre à jour la position du curseur
      if (this.cursors) {
        console.log('Déplacement du curseur pour:', username, 'à l\'index:', index);
        this.cursors.moveCursor(userId.toString(), { index, length: 0 });
        this.activeCollaborators[userId].index = index;
      } else {
        console.error('Module cursors non disponible lors du déplacement du curseur');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du curseur:', error);
    }
  }

  /**
   * Met à jour la sélection d'un collaborateur
   */
  private updateCollaboratorSelection(data: any): void {
    const { userId, range } = data;

    console.log('Mise à jour de la sélection pour l\'utilisateur:', userId, 'range:', range);

    try {
      // Si le module cursors n'est pas disponible, essayer de le créer
      if (!this.cursors && this.quill) {
        console.log('Tentative de création du module cursors');
        try {
          this.cursors = new QuillCursors(this.quill);
          console.log('Module cursors créé avec succès:', this.cursors);
        } catch (error) {
          console.error('Erreur lors de la création du module cursors:', error);
        }
      }

      if (this.activeCollaborators[userId] && this.cursors) {
        // Mettre à jour la sélection
        console.log('Déplacement du curseur avec sélection pour:', userId);
        this.cursors.moveCursor(userId.toString(), range);
        this.activeCollaborators[userId].range = range;
      } else {
        console.error('Collaborateur non trouvé ou module cursors non disponible');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la sélection:', error);
    }
  }

  /**
   * Met à jour le statut de frappe d'un collaborateur
   */
  private updateCollaboratorTypingStatus(data: any): void {
    const { userId, isTyping } = data;

    console.log('Mise à jour du statut de frappe pour l\'utilisateur:', userId, 'isTyping:', isTyping);

    if (this.activeCollaborators[userId]) {
      this.activeCollaborators[userId].isTyping = isTyping;
    } else {
      console.error('Collaborateur non trouvé lors de la mise à jour du statut de frappe');
    }
  }

  /**
   * Gère l'arrivée d'un nouvel utilisateur
   */
  private handleUserJoined(data: any): void {
    const { userId, username, activeUsers } = data;

    // Mettre à jour la liste des utilisateurs actifs
    if (activeUsers) {
      activeUsers.forEach((user: any) => {
        if (user.id !== this.currentUserId && !this.activeCollaborators[user.id]) {
          this.activeCollaborators[user.id] = {
            id: user.id,
            name: user.username,
            color: user.color || this.getRandomColor(),
            index: 0
          };

          // Créer le curseur dans l'éditeur
          this.cursors.createCursor(user.id.toString(), user.username, user.color || this.getRandomColor());
        }
      });
    }
  }

  /**
   * Gère le départ d'un utilisateur
   */
  private handleUserLeft(data: any): void {
    const { userId } = data;

    // Supprimer le curseur de l'utilisateur
    if (this.activeCollaborators[userId]) {
      this.cursors.removeCursor(userId.toString());
      delete this.activeCollaborators[userId];
    }
  }

  /**
   * Génère une couleur aléatoire pour un curseur
   */
  private getRandomColor(): string {
    const colors = [
      '#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3',
      '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}
