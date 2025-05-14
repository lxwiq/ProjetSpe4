import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import {
  Document,
  DocumentCollaborator,
  DocumentResponse,
  CollaboratorsResponse,
  CreateDocumentRequest,
  UpdateDocumentRequest,
  InviteCollaboratorRequest,
  ActiveUsersResponse,
  ActiveDocumentUser
} from '../models/document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Récupère tous les documents accessibles par l'utilisateur
   * @returns Observable avec la liste des documents
   */
  getAllDocuments(): Observable<Document[]> {
    return this.http.get<DocumentResponse>(`${this.API_URL}/documents`, { withCredentials: true })
      .pipe(
        map(response => Array.isArray(response) ? response : (Array.isArray(response.data) ? response.data : [])),
        catchError(error => {
          console.error('Erreur lors de la récupération des documents:', error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Récupère un document par son ID
   * @param documentId ID du document
   * @returns Observable avec le document
   */
  getDocumentById(documentId: number): Observable<Document> {
    return this.http.get<DocumentResponse>(`${this.API_URL}/documents/${documentId}`, { withCredentials: true })
      .pipe(
        map(response => {
          console.log('Réponse du serveur pour getDocumentById:', response);

          // Si la réponse est directement un objet document (comme dans l'erreur signalée)
          if (response && typeof response === 'object' && 'id' in response) {
            console.log('Réponse identifiée comme un objet document direct');
            // Vérifier que l'objet a les propriétés minimales requises pour un Document
            if ('title' in response && 'owner_id' in response) {
              return response as unknown as Document;
            } else {
              console.warn('Objet avec ID mais sans propriétés requises pour un Document');
              // Créer un Document valide à partir des données disponibles
              return {
                id: response.id as number,
                title: (response as any).title || 'Document sans titre',
                owner_id: (response as any).owner_id || 0,
                content: (response as any).content,
                is_folder: (response as any).is_folder || false
              } as Document;
            }
          }

          // Vérifier si la réponse est un tableau
          if (Array.isArray(response)) {
            return response[0];
          }

          // Vérifier si la réponse a une propriété data qui est un tableau
          if (response && response.data && Array.isArray(response.data)) {
            return response.data[0];
          }

          // Vérifier si la réponse a une propriété data qui est un objet
          if (response && response.data && typeof response.data === 'object') {
            return response.data as Document;
          }

          // Si aucune des conditions ci-dessus n'est remplie, retourner un document par défaut
          console.warn('Format de réponse inattendu pour getDocumentById, création d\'un document par défaut');
          return {
            id: documentId,
            title: 'Document sans titre',
            content: '',
            owner_id: 0,
            is_folder: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          } as Document;
        }),
        catchError(error => {
          console.error(`Erreur lors de la récupération du document ${documentId}:`, error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Crée un nouveau document ou dossier
   * @param documentData Données du document à créer
   * @returns Observable avec le document créé
   */
  createDocument(documentData: CreateDocumentRequest): Observable<Document> {
    const formData = new FormData();
    formData.append('title', documentData.title);

    if (documentData.content) {
      formData.append('content', documentData.content);
    }

    if (documentData.parentFolderId) {
      formData.append('parentFolderId', documentData.parentFolderId.toString());
    }

    if (documentData.isFolder !== undefined) {
      formData.append('isFolder', documentData.isFolder.toString());
    }

    if (documentData.file) {
      formData.append('file', documentData.file);
    }

    return this.http.post<DocumentResponse>(`${this.API_URL}/documents`, formData, { withCredentials: true })
      .pipe(
        map(response => Array.isArray(response.data) ? response.data[0] : response.data as Document),
        catchError(error => {
          console.error('Erreur lors de la création du document:', error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Met à jour un document existant
   * @param documentId ID du document
   * @param documentData Données du document à mettre à jour
   * @returns Observable avec le document mis à jour
   */
  updateDocument(documentId: number, documentData: UpdateDocumentRequest): Observable<Document> {
    return this.http.put<DocumentResponse>(`${this.API_URL}/documents/${documentId}`, documentData, { withCredentials: true })
      .pipe(
        map(response => Array.isArray(response.data) ? response.data[0] : response.data as Document),
        catchError(error => {
          console.error(`Erreur lors de la mise à jour du document ${documentId}:`, error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Supprime un document
   * @param documentId ID du document
   * @returns Observable avec le message de confirmation
   */
  deleteDocument(documentId: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.API_URL}/documents/${documentId}`, { withCredentials: true })
      .pipe(
        catchError(error => {
          console.error(`Erreur lors de la suppression du document ${documentId}:`, error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Récupère les collaborateurs d'un document
   * @param documentId ID du document
   * @returns Observable avec la liste des collaborateurs
   */
  getDocumentCollaborators(documentId: number): Observable<DocumentCollaborator[]> {
    return this.http.get<CollaboratorsResponse>(`${this.API_URL}/documents/${documentId}/collaborators`, { withCredentials: true })
      .pipe(
        map(response => Array.isArray(response) ? response : (Array.isArray(response.data) ? response.data : [])),
        catchError(error => {
          console.error(`Erreur lors de la récupération des collaborateurs du document ${documentId}:`, error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Invite un utilisateur à collaborer sur un document
   * @param documentId ID du document
   * @param inviteData Données de l'invitation
   * @returns Observable avec le résultat de l'invitation
   */
  inviteCollaborator(documentId: number, inviteData: InviteCollaboratorRequest): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/documents/${documentId}/invite`, inviteData, { withCredentials: true })
      .pipe(
        catchError(error => {
          console.error(`Erreur lors de l'invitation à collaborer sur le document ${documentId}:`, error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Récupère les utilisateurs actifs sur un document
   * @param documentId ID du document
   * @returns Observable avec la liste des utilisateurs actifs
   */
  getActiveUsers(documentId: number): Observable<ActiveDocumentUser[]> {
    return this.http.get<ActiveUsersResponse>(`${this.API_URL}/collaborative-documents/${documentId}/active-users`, { withCredentials: true })
      .pipe(
        map(response => Array.isArray(response) ? response : (Array.isArray(response.data) ? response.data : [])),
        catchError(error => {
          console.error(`Erreur lors de la récupération des utilisateurs actifs sur le document ${documentId}:`, error);
          return throwError(() => error);
        })
      );
  }
}
