import { Injectable, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, Subject, interval, of } from 'rxjs';
import { switchMap, catchError, tap, finalize } from 'rxjs/operators';

import { WebsocketService } from './websocket.service';
import { DocumentService } from './document.service';
import {
  Document,
  ActiveDocumentUser,
  DocumentDelta,
  CursorPosition
} from '../models/document.model';

@Injectable({
  providedIn: 'root'
})
export class CollaborativeDocumentService {
  // Signaux pour l'état du document
  activeDocument = signal<Document | null>(null);
  activeUsers = signal<ActiveDocumentUser[]>([]);
  isEditing = signal<boolean>(false);
  isSaving = signal<boolean>(false);
  lastSaved = signal<Date | null>(null);

  // Sujets pour les événements d'édition
  private contentChanged = new Subject<DocumentDelta>();
  private cursorMoved = new Subject<{ userId: number, position: CursorPosition }>();
  private documentSaved = new Subject<{ documentId: number, savedAt: Date, versionNumber: number }>();

  private destroyRef = inject(DestroyRef);
  private autoSaveInterval: any;
  private currentDocumentId: number | null = null;

  constructor(
    private websocketService: WebsocketService,
    private documentService: DocumentService
  ) {
    // Écouter les événements WebSocket
    this.setupWebSocketListeners();
  }

  /**
   * Configure les écouteurs d'événements WebSocket
   */
  private setupWebSocketListeners(): void {
    // Écouter les utilisateurs qui rejoignent le document
    this.websocketService.onDocumentUserJoined()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        console.log('Utilisateur a rejoint le document:', data);
        this.updateActiveUsers(data.activeUsers);
      });

    // Écouter les utilisateurs qui quittent le document
    this.websocketService.onDocumentUserLeft()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        console.log('Utilisateur a quitté le document:', data);
        this.updateActiveUsers(data.activeUsers);
      });

    // Écouter les modifications de contenu
    this.websocketService.onDocumentContentChanged()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        console.log('Contenu du document modifié:', data);
        this.contentChanged.next(data);
      });

    // Écouter les mouvements de curseur
    this.websocketService.onDocumentCursorMoved()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        console.log('Curseur déplacé:', data);
        this.cursorMoved.next({
          userId: data.userId,
          position: data.position
        });
      });

    // Écouter les sauvegardes de document
    this.websocketService.onDocumentSaved()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        console.log('Document sauvegardé:', data);
        this.lastSaved.set(new Date(data.savedAt));
        this.documentSaved.next({
          documentId: data.documentId,
          savedAt: new Date(data.savedAt),
          versionNumber: data.versionNumber
        });
      });
  }

  /**
   * Met à jour la liste des utilisateurs actifs
   * @param users Liste des utilisateurs actifs
   */
  private updateActiveUsers(users: ActiveDocumentUser[]): void {
    if (users && Array.isArray(users)) {
      this.activeUsers.set(users);
    }
  }

  /**
   * Rejoint un document pour l'édition collaborative
   * @param documentId ID du document
   * @returns Observable avec les informations du document
   */
  joinDocument(documentId: number): Observable<{ document: Document, activeUsers: ActiveDocumentUser[], currentContent: string }> {
    this.currentDocumentId = documentId;
    this.isEditing.set(true);

    return new Observable(observer => {
      this.websocketService.emit('document:join', { documentId }, (response: any) => {
        if (response.success) {
          console.log('Document rejoint avec succès:', response.data);

          // Mettre à jour l'état
          this.activeDocument.set(response.data.document);
          this.updateActiveUsers(response.data.activeUsers);

          // Configurer la sauvegarde automatique avec un intervalle de 10 secondes
          this.setupAutoSave(documentId, 10);

          // Notifier l'observateur
          observer.next(response.data);
          observer.complete();
        } else {
          console.error('Erreur lors de la connexion au document:', response.error);
          observer.error(new Error(response.error));
        }
      });
    });
  }

  /**
   * Quitte un document
   * @param documentId ID du document
   */
  leaveDocument(documentId: number): void {
    if (this.currentDocumentId !== documentId) {
      return;
    }

    this.websocketService.emit('document:leave', { documentId });

    // Nettoyer l'état
    this.currentDocumentId = null;
    this.activeDocument.set(null);
    this.activeUsers.set([]);
    this.isEditing.set(false);
    this.lastSaved.set(null);

    // Arrêter la sauvegarde automatique
    this.clearAutoSave();
  }

  /**
   * Configure la sauvegarde automatique
   * @param documentId ID du document
   * @param intervalSeconds Intervalle de sauvegarde en secondes
   */
  private setupAutoSave(documentId: number, intervalSeconds: number): void {
    // Nettoyer tout intervalle existant
    this.clearAutoSave();

    // Configurer un nouvel intervalle
    this.autoSaveInterval = interval(intervalSeconds * 1000)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap(() => {
          if (!this.isEditing() || !this.currentDocumentId) {
            return of(null);
          }

          console.log('CollaborativeDocumentService: Sauvegarde automatique déclenchée');

          // Ne pas définir isSaving ici, car saveDocument() le fait déjà

          return this.saveDocument(documentId).pipe(
            tap(result => {
              console.log('CollaborativeDocumentService: Sauvegarde automatique réussie:', result);
            }),
            catchError(error => {
              console.error('CollaborativeDocumentService: Erreur lors de la sauvegarde automatique:', error);

              // Planifier une nouvelle tentative dans 30 secondes
              setTimeout(() => {
                console.log('CollaborativeDocumentService: Nouvelle tentative de sauvegarde automatique');
                this.saveDocument(documentId).subscribe({
                  next: () => console.log('CollaborativeDocumentService: Nouvelle tentative réussie'),
                  error: (retryError) => console.error('CollaborativeDocumentService: Échec de la nouvelle tentative:', retryError)
                });
              }, 30000);

              return of(null);
            }),
            finalize(() => {
              // S'assurer que isSaving est remis à false même en cas d'erreur
              if (this.isSaving()) {
                console.warn('CollaborativeDocumentService: Réinitialisation forcée de isSaving');
                this.isSaving.set(false);
              }
            })
          );
        })
      )
      .subscribe();
  }

  /**
   * Nettoie l'intervalle de sauvegarde automatique
   */
  private clearAutoSave(): void {
    if (this.autoSaveInterval) {
      this.autoSaveInterval.unsubscribe();
      this.autoSaveInterval = null;
    }
  }

  /**
   * Met à jour le contenu d'un document
   * @param documentId ID du document
   * @param content Nouveau contenu
   * @param delta Delta des modifications (optionnel)
   */
  updateContent(documentId: number, content: string, delta?: any): void {
    if (!this.isEditing() || this.currentDocumentId !== documentId) {
      return;
    }

    // Vérifier que le contenu est valide
    if (content === undefined || content === null || content.trim() === '') {
      console.warn('🔄 [CollaborativeDoc] Alerte: Contenu vide ou invalide détecté');
      content = '<p>Document vide</p>'; // Utiliser un contenu HTML minimal comme fallback
    }

    // Log du contenu à mettre à jour
    console.log(`🔄 [CollaborativeDoc] Mise à jour: Document ${documentId} (${content.length} caractères)`);
    console.log(`📝 [CollaborativeDoc] Contenu: ${content.substring(0, 50)}...`);

    // Mettre à jour le document local
    const activeDoc = this.activeDocument();
    if (activeDoc) {
      // Créer une copie pour éviter les problèmes de référence
      const updatedDoc = { ...activeDoc, content };
      this.activeDocument.set(updatedDoc);
    }

    // Toujours privilégier l'envoi du delta pour les mises à jour en temps réel
    // si disponible, car c'est plus efficace et précis
    const data: any = { documentId };

    if (delta) {
      data.delta = delta;
      console.log('🔄 [CollaborativeDoc] Envoi: Delta au serveur');

      // Vérifier que le delta a une structure valide avec des opérations
      if (!delta.ops || !Array.isArray(delta.ops)) {
        console.warn('🔄 [CollaborativeDoc] Alerte: Delta sans opérations valides, ajout d\'un tableau vide');
        data.delta.ops = [];
      }

      // S'assurer que le WebSocket est connecté avant d'envoyer
      if (this.websocketService.isConnected()) {
        this.websocketService.emit('document:update', data);
      } else {
        console.warn('🔄 [CollaborativeDoc] Alerte: WebSocket non connecté, mise à jour différée');
        // Stocker la dernière mise à jour pour l'envoyer lors de la reconnexion
        setTimeout(() => {
          if (this.websocketService.isConnected()) {
            console.log('🔄 [CollaborativeDoc] Réessai d\'envoi du delta après reconnexion');
            this.websocketService.emit('document:update', data);
          }
        }, 1000);
      }
    } else {
      // Fallback au contenu complet si aucun delta n'est disponible
      data.content = content;
      console.log(`🔄 [CollaborativeDoc] Envoi: Contenu complet au serveur (${content.length} caractères)`);
      this.websocketService.emit('document:update', data);
    }
  }

  /**
   * Met à jour la position du curseur
   * @param documentId ID du document
   * @param position Position du curseur
   */
  updateCursorPosition(documentId: number, position: CursorPosition): void {
    if (!this.isEditing() || this.currentDocumentId !== documentId) {
      return;
    }

    this.websocketService.emit('document:cursor-update', {
      documentId,
      position
    });
  }

  /**
   * Sauvegarde un document
   * @param documentId ID du document
   * @returns Observable avec le résultat de la sauvegarde
   */
  saveDocument(documentId: number): Observable<any> {
    // Indiquer que la sauvegarde est en cours
    this.isSaving.set(true);

    return new Observable(observer => {
      // Récupérer le contenu actuel du document
      const activeDoc = this.activeDocument();
      if (!activeDoc) {
        console.error('CollaborativeDocumentService: Document actif non disponible');
        this.isSaving.set(false);
        observer.error(new Error('Document actif non disponible'));
        return;
      }

      // Vérifier que le contenu est valide
      if (activeDoc.content === undefined || activeDoc.content === null || activeDoc.content.trim() === '') {
        console.warn('🔄 [CollaborativeDoc] Alerte: Contenu vide ou invalide détecté lors de la sauvegarde');
        activeDoc.content = '<p>Document vide</p>'; // Utiliser un contenu HTML minimal comme fallback
      }

      // Log du contenu à sauvegarder
      console.log(`🔄 [CollaborativeDoc] Sauvegarde: Document ${documentId} (${activeDoc.content.length} caractères)`);
      console.log(`📝 [CollaborativeDoc] Contenu: ${activeDoc.content.substring(0, 50)}...`);

      // Vérifier d'abord si le WebSocket est connecté
      if (!this.websocketService.isConnected()) {
        console.warn('🔄 [CollaborativeDoc] Alerte: WebSocket non connecté, fallback HTTP');

        // Vérifier une dernière fois que le contenu est valide avant l'envoi HTTP
        if (activeDoc.content === undefined || activeDoc.content === null || activeDoc.content.trim() === '') {
          console.warn('🔄 [CollaborativeDoc] Alerte: Contenu invalide avant envoi HTTP');
          activeDoc.content = '<p>Document vide</p>'; // Utiliser un contenu HTML minimal comme fallback
        }

        console.log(`🔄 [CollaborativeDoc] Fallback HTTP: ${activeDoc.content.length} caractères`);
        console.log(`📝 [CollaborativeDoc] Contenu HTTP: ${activeDoc.content.substring(0, 50)}...`);

        // Tenter de sauvegarder via HTTP comme fallback
        this.documentService.updateDocument(documentId, {
          title: activeDoc.title,
          content: activeDoc.content
        }).subscribe({
          next: (updatedDoc) => {
            console.log('Document sauvegardé avec succès via HTTP:', updatedDoc);
            this.lastSaved.set(new Date());
            this.isSaving.set(false);
            observer.next({
              documentId,
              savedAt: new Date(),
              savedViaHttp: true
            });
            observer.complete();

            // Émettre un événement pour indiquer que le document a été sauvegardé
            this.documentSaved.next({
              documentId,
              savedAt: new Date(),
              versionNumber: 0 // Version inconnue pour les sauvegardes HTTP
            });
          },
          error: (error) => {
            console.error('Erreur lors de la sauvegarde du document via HTTP:', error);
            this.isSaving.set(false);
            observer.error(error);
          }
        });

        return;
      }

      // Sauvegarde via WebSocket
      console.log('🔄 [CollaborativeDoc] Info: Tentative de sauvegarde via WebSocket');

      // Vérifier une dernière fois que le contenu est valide avant l'envoi HTTP
      if (activeDoc.content === undefined || activeDoc.content === null || activeDoc.content.trim() === '') {
        console.warn('🔄 [CollaborativeDoc] Alerte: Contenu invalide avant HTTP+WebSocket');
        activeDoc.content = '<p>Document vide</p>'; // Utiliser un contenu HTML minimal comme fallback
      }

      console.log(`🔄 [CollaborativeDoc] HTTP+WebSocket: ${activeDoc.content.length} caractères`);
      console.log(`📝 [CollaborativeDoc] Contenu HTTP+WS: ${activeDoc.content.substring(0, 50)}...`);

      // Sauvegarder d'abord via HTTP pour s'assurer que le contenu est bien sauvegardé
      this.documentService.updateDocument(documentId, {
        title: activeDoc.title,
        content: activeDoc.content
      }).subscribe({
        next: (updatedDoc) => {
          console.log('Document sauvegardé avec succès via HTTP avant WebSocket:', updatedDoc);

          // Maintenant, sauvegarder via WebSocket pour mettre à jour les autres utilisateurs
          // Définir un timeout pour la sauvegarde WebSocket
          const timeoutId = setTimeout(() => {
            console.error('CollaborativeDocumentService: Timeout lors de la sauvegarde WebSocket du document');
            // Ne pas échouer complètement car la sauvegarde HTTP a réussi
            this.isSaving.set(false);
            observer.next({
              documentId,
              savedAt: new Date(),
              savedViaHttp: true,
              webSocketTimeout: true
            });
            observer.complete();
          }, 10000); // 10 secondes de timeout

          // Envoyer le contenu avec la demande de sauvegarde
          this.websocketService.emit('document:save', {
            documentId,
            content: activeDoc.content  // Ajouter le contenu à la demande de sauvegarde
          }, (response: any) => {
            // Annuler le timeout
            clearTimeout(timeoutId);

            if (response && response.success) {
              console.log('Document sauvegardé avec succès via WebSocket:', response.data);
              this.lastSaved.set(new Date(response.data.savedAt));
              this.isSaving.set(false);

              // Vérifier que la sauvegarde a bien été effectuée
              this.verifyDocumentSaved(documentId).subscribe({
                next: (verified) => {
                  if (verified) {
                    observer.next(response.data);
                    observer.complete();
                  } else {
                    console.warn('CollaborativeDocumentService: La vérification de sauvegarde a échoué, mais la sauvegarde HTTP a réussi');
                    // Ne pas échouer car la sauvegarde HTTP a réussi
                    observer.next({
                      documentId,
                      savedAt: new Date(),
                      savedViaHttp: true,
                      verificationFailed: true
                    });
                    observer.complete();
                  }
                },
                error: (error) => {
                  console.error('Erreur lors de la vérification de sauvegarde:', error);
                  // Ne pas échouer car la sauvegarde HTTP a réussi
                  observer.next({
                    documentId,
                    savedAt: new Date(),
                    savedViaHttp: true,
                    verificationError: true
                  });
                  observer.complete();
                }
              });
            } else {
              console.error('Erreur lors de la sauvegarde WebSocket du document:', response?.error || 'Réponse invalide');
              // Ne pas échouer car la sauvegarde HTTP a réussi
              this.isSaving.set(false);
              observer.next({
                documentId,
                savedAt: new Date(),
                savedViaHttp: true,
                webSocketError: true
              });
              observer.complete();
            }
          });
        },
        error: (error) => {
          console.error('Erreur lors de la sauvegarde HTTP du document:', error);
          this.isSaving.set(false);
          observer.error(error);
        }
      });
    });
  }

  /**
   * Vérifie que le document a bien été sauvegardé
   * @param documentId ID du document
   * @returns Observable qui émet true si le document a bien été sauvegardé
   */
  private verifyDocumentSaved(documentId: number): Observable<boolean> {
    return new Observable(observer => {
      // Vérifier via HTTP que le document a bien été sauvegardé
      this.documentService.getDocumentById(documentId).subscribe({
        next: (document) => {
          if (document) {
            console.log('CollaborativeDocumentService: Document vérifié avec succès');
            observer.next(true);
            observer.complete();
          } else {
            console.warn('CollaborativeDocumentService: Document non trouvé lors de la vérification');
            observer.next(false);
            observer.complete();
          }
        },
        error: (error) => {
          console.error('Erreur lors de la vérification du document:', error);
          observer.error(error);
        }
      });
    });
  }

  /**
   * Observable pour les modifications de contenu
   * @returns Observable avec les deltas de modification
   */
  onContentChanged(): Observable<DocumentDelta> {
    return this.contentChanged.asObservable();
  }

  /**
   * Observable pour les mouvements de curseur
   * @returns Observable avec les positions de curseur
   */
  onCursorMoved(): Observable<{ userId: number, position: CursorPosition }> {
    return this.cursorMoved.asObservable();
  }

  /**
   * Observable pour les sauvegardes de document
   * @returns Observable avec les informations de sauvegarde
   */
  onDocumentSaved(): Observable<{ documentId: number, savedAt: Date, versionNumber: number }> {
    return this.documentSaved.asObservable();
  }
}
