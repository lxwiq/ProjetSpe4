import { Injectable, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, Subject, interval, of } from 'rxjs';
import { switchMap, catchError, tap } from 'rxjs/operators';

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
          
          // Configurer la sauvegarde automatique
          this.setupAutoSave(documentId, response.data.document.auto_save_interval || 30);
          
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
          
          this.isSaving.set(true);
          
          return this.saveDocument(documentId).pipe(
            tap(() => this.isSaving.set(false)),
            catchError(error => {
              console.error('Erreur lors de la sauvegarde automatique:', error);
              this.isSaving.set(false);
              return of(null);
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
    
    const data: any = { documentId };
    
    if (delta) {
      data.delta = delta;
    } else {
      data.content = content;
    }
    
    this.websocketService.emit('document:update', data);
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
    return new Observable(observer => {
      this.websocketService.emit('document:save', { documentId }, (response: any) => {
        if (response.success) {
          console.log('Document sauvegardé avec succès:', response.data);
          this.lastSaved.set(new Date(response.data.savedAt));
          observer.next(response.data);
          observer.complete();
        } else {
          console.error('Erreur lors de la sauvegarde du document:', response.error);
          observer.error(new Error(response.error));
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
