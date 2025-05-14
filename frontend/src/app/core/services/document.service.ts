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
        map(response => Array.isArray(response) ? response[0] : (Array.isArray(response.data) ? response.data[0] : response.data as Document)),
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
