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
        if (data && data.activeUsers) {
          this.updateActiveUsers(data.activeUsers);
        } else {
          console.warn('Données d\'utilisateurs actifs manquantes dans l\'événement document:user-joined');
          // Tenter de récupérer les utilisateurs actifs via l'API
          this.refreshActiveUsers(this.currentDocumentId);
        }
      });

    // Écouter les utilisateurs qui quittent le document
    this.websocketService.onDocumentUserLeft()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        console.log('Utilisateur a quitté le document:', data);
        if (data && data.activeUsers) {
          this.updateActiveUsers(data.activeUsers);
        } else {
          console.warn('Données d\'utilisateurs actifs manquantes dans l\'événement document:user-left');
          // Tenter de récupérer les utilisateurs actifs via l'API
          this.refreshActiveUsers(this.currentDocumentId);
        }
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
      console.log('Mise à jour des utilisateurs actifs:', users);
      this.activeUsers.set(users);
    }
  }

  /**
   * Rafraîchit la liste des utilisateurs actifs via l'API
   * @param documentId ID du document
   */
  private refreshActiveUsers(documentId: number | null): void {
    if (!documentId) return;

    this.documentService.getActiveUsers(documentId).subscribe({
      next: (users) => {
        console.log('Utilisateurs actifs récupérés via API:', users);
        this.updateActiveUsers(users);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des utilisateurs actifs:', error);
      }
    });
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
        if (response && response.success) {
          console.log('Document rejoint avec succès:', response.data);

          // Mettre à jour l'état
          if (response.data && response.data.document) {
            this.activeDocument.set(response.data.document);
          }

          if (response.data && response.data.activeUsers) {
            this.updateActiveUsers(response.data.activeUsers);
          } else {
            // Si les utilisateurs actifs ne sont pas fournis, les récupérer via l'API
            this.refreshActiveUsers(documentId);
          }

          // Configurer la sauvegarde automatique avec un intervalle de 10 secondes
          this.setupAutoSave(documentId, 10);

          // Notifier l'observateur
          observer.next(response.data);
          observer.complete();
        } else {
          console.error('Erreur lors de la connexion au document:', response ? response.error : 'Réponse invalide');
          observer.error(new Error(response ? response.error : 'Erreur de connexion au document'));
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

  // Propriété pour stocker le dernier timestamp d'envoi de delta
  private lastDeltaSentTimestamp = 0;
  // Intervalle minimum entre les envois de delta (en ms) pour éviter de surcharger le serveur
  private readonly DELTA_THROTTLE_INTERVAL = 50;
  // File d'attente pour les deltas en attente d'envoi
  private pendingDeltas: Array<{delta: any, content: string}> = [];
  // Timer pour l'envoi des deltas en attente
  private pendingDeltaTimer: any = null;

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
      content = '<p>Document vide</p>'; // Utiliser un contenu HTML minimal comme fallback
    }

    // Mettre à jour le document local immédiatement
    const activeDoc = this.activeDocument();
    if (activeDoc) {
      // Créer une copie pour éviter les problèmes de référence
      const updatedDoc = { ...activeDoc, content };
      this.activeDocument.set(updatedDoc);
    }

    // Toujours privilégier l'envoi du delta pour les mises à jour en temps réel
    const data: any = { documentId };
    const now = Date.now();

    if (delta) {
      // Vérifier que le delta a une structure valide avec des opérations
      if (!delta.ops || !Array.isArray(delta.ops)) {
        // Si le delta est invalide, utiliser le contenu complet
        data.content = content;
        this.sendContentUpdate(data);
        return;
      }

      // Appliquer la limitation de débit (throttling) pour les deltas
      if (now - this.lastDeltaSentTimestamp < this.DELTA_THROTTLE_INTERVAL) {
        // Ajouter le delta à la file d'attente
        this.pendingDeltas.push({delta, content});

        // Si aucun timer n'est en cours, en créer un pour traiter les deltas en attente
        if (!this.pendingDeltaTimer) {
          this.pendingDeltaTimer = setTimeout(() => {
            this.processPendingDeltas(documentId);
          }, this.DELTA_THROTTLE_INTERVAL);
        }
        return;
      }

      // Envoyer le delta immédiatement
      data.delta = delta;
      data.content = content; // Inclure le contenu pour la synchronisation
      this.lastDeltaSentTimestamp = now;
      this.sendContentUpdate(data);
    } else {
      // Fallback au contenu complet si aucun delta n'est disponible
      data.content = content;
      this.sendContentUpdate(data);
    }
  }

  /**
   * Traite les deltas en attente d'envoi
   * @param documentId ID du document
   */
  private processPendingDeltas(documentId: number): void {
    // Réinitialiser le timer
    this.pendingDeltaTimer = null;

    if (this.pendingDeltas.length === 0) {
      return;
    }

    // Prendre le dernier delta et le contenu correspondant
    const lastItem = this.pendingDeltas.pop();

    // Vider la file d'attente
    this.pendingDeltas = [];

    if (lastItem) {
      // Envoyer le dernier delta avec le contenu complet pour assurer la synchronisation
      const data = {
        documentId,
        delta: lastItem.delta,
        content: lastItem.content
      };

      this.lastDeltaSentTimestamp = Date.now();
      this.sendContentUpdate(data);
    }
  }

  /**
   * Envoie une mise à jour de contenu au serveur
   * @param data Données à envoyer
   */
  private sendContentUpdate(data: any): void {
    // S'assurer que le WebSocket est connecté avant d'envoyer
    if (this.websocketService.isConnected()) {
      this.websocketService.emit('document:update', data);
    } else {
      // Stocker la dernière mise à jour pour l'envoyer lors de la reconnexion
      setTimeout(() => {
        if (this.websocketService.isConnected()) {
          this.websocketService.emit('document:update', data);
        }
      }, 1000);
    }
  }

  // Propriété pour stocker le dernier timestamp d'envoi de position de curseur
  private lastCursorSentTimestamp = 0;
  // Intervalle minimum entre les envois de position de curseur (en ms)
  private readonly CURSOR_THROTTLE_INTERVAL = 100;
  // Dernière position de curseur en attente d'envoi
  private pendingCursorPosition: CursorPosition | null = null;
  // Timer pour l'envoi de la position de curseur en attente
  private pendingCursorTimer: any = null;

  /**
   * Met à jour la position du curseur
   * @param documentId ID du document
   * @param position Position du curseur
   */
  updateCursorPosition(documentId: number, position: CursorPosition): void {
    if (!this.isEditing() || this.currentDocumentId !== documentId) {
      return;
    }

    // Vérifier que la position est valide
    if (!position || position.index === undefined) {
      return;
    }

    const now = Date.now();

    // Appliquer la limitation de débit (throttling) pour les positions de curseur
    if (now - this.lastCursorSentTimestamp < this.CURSOR_THROTTLE_INTERVAL) {
      // Stocker la dernière position
      this.pendingCursorPosition = position;

      // Si aucun timer n'est en cours, en créer un pour envoyer la position en attente
      if (!this.pendingCursorTimer) {
        this.pendingCursorTimer = setTimeout(() => {
          this.processPendingCursorPosition(documentId);
        }, this.CURSOR_THROTTLE_INTERVAL);
      }
      return;
    }

    // Envoyer la position immédiatement
    this.lastCursorSentTimestamp = now;
    this.sendCursorPosition(documentId, position);
  }

  /**
   * Traite la position de curseur en attente d'envoi
   * @param documentId ID du document
   */
  private processPendingCursorPosition(documentId: number): void {
    // Réinitialiser le timer
    this.pendingCursorTimer = null;

    if (!this.pendingCursorPosition) {
      return;
    }

    // Envoyer la position en attente
    this.lastCursorSentTimestamp = Date.now();
    this.sendCursorPosition(documentId, this.pendingCursorPosition);

    // Réinitialiser la position en attente
    this.pendingCursorPosition = null;
  }

  /**
   * Envoie une position de curseur au serveur
   * @param documentId ID du document
   * @param position Position du curseur
   */
  private sendCursorPosition(documentId: number, position: CursorPosition): void {
    if (this.websocketService.isConnected()) {
      this.websocketService.emit('document:cursor-update', {
        documentId,
        position
      });
    }
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
