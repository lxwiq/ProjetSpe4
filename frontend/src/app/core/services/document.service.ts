import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpContext, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, switchMap, retry, delay } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import {
  Document,
  DocumentResponse,
  CreateDocumentRequest,
  UpdateDocumentRequest,
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
    console.log(`🌐 [DocumentService] Mise à jour: Document ${documentId}`);

    // Créer une copie des données pour éviter les modifications accidentelles
    const payload = { ...documentData };

    // Vérifier si le contenu est défini et non vide
    if (payload.content !== undefined) {
      if (payload.content === null || payload.content.trim() === '') {
        console.warn(`🌐 [DocumentService] Alerte: Contenu vide détecté pour document ${documentId}`);
        payload.content = '<p>Document vide</p>'; // Utiliser un contenu HTML minimal comme fallback
      }

      console.log(`🌐 [DocumentService] Envoi: ${payload.content.length} caractères`);
      console.log(`📝 [DocumentService] Contenu: ${payload.content.substring(0, 50)}...`);
    }

    // Vérifier si le document existe avant de le mettre à jour
    return this.getDocumentById(documentId).pipe(
      switchMap(existingDocument => {
        if (!existingDocument) {
          console.error(`DocumentService: Document ${documentId} non trouvé`);
          return throwError(() => new Error(`Document ${documentId} non trouvé`));
        }

        console.log(`DocumentService: Document ${documentId} trouvé, mise à jour...`);

        // Effectuer la mise à jour
        return this.http.put<DocumentResponse>(
          `${this.API_URL}/documents/${documentId}`,
          payload,
          {
            withCredentials: true
          }
        ).pipe(
          map(response => {
            // Afficher la structure complète de la réponse pour le débogage
            console.log(`🌐 [DocumentService] Réponse brute:`, JSON.stringify(response, null, 2));

            // Vérifier si la réponse est directement un document (sans propriété data)
            if (response && typeof response === 'object' && 'id' in response) {
              console.log(`🌐 [DocumentService] Succès: Document ${documentId} mis à jour (format direct)`);
              // Vérifier si la réponse a les propriétés minimales d'un Document
              if ('title' in response && 'owner_id' in response) {
                return response as Document;
              } else {
                console.log(`🌐 [DocumentService] Conversion: Réponse avec ID mais sans toutes les propriétés requises`);
                // Créer un Document valide à partir des données disponibles
                return {
                  id: response.id as number,
                  title: (response as any).title || 'Document sans titre',
                  owner_id: (response as any).owner_id || 0,
                  content: (response as any).content || '',
                  is_folder: (response as any).is_folder || false,
                  created_at: (response as any).created_at || new Date().toISOString(),
                  updated_at: (response as any).updated_at || new Date().toISOString()
                } as Document;
              }
            }

            // Vérifier si la réponse a une propriété data
            if (response && response.data) {
              // Extraire le document de la réponse
              const updatedDoc = Array.isArray(response.data)
                ? (response.data.length > 0 ? response.data[0] : null)
                : response.data as Document;

              if (updatedDoc) {
                console.log(`🌐 [DocumentService] Succès: Document ${documentId} mis à jour`);
                console.log(`🌐 [DocumentService] Réponse: Document ${updatedDoc.id} (${updatedDoc.title})`);
                return updatedDoc;
              }
            }

            // Si on arrive ici, c'est que le document n'a pas été trouvé dans la réponse
            console.warn(`🌐 [DocumentService] Alerte: Document non trouvé dans la réponse`);
            console.log(`🌐 [DocumentService] Utilisation du document existant comme fallback`);
            return existingDocument;
          }),
          // Ajouter des tentatives en cas d'erreur réseau
          retry({
            count: 2,
            delay: (error, retryCount) => {
              // Ne pas réessayer pour les erreurs d'authentification ou les erreurs serveur
              if (error instanceof HttpErrorResponse &&
                  (error.status === 401 || error.status === 403 || error.status >= 500)) {
                return throwError(() => error);
              }

              // Délai exponentiel pour les autres erreurs
              const delayMs = retryCount * 2000; // 2s, 4s
              console.log(`DocumentService: Tentative de réessai ${retryCount} dans ${delayMs}ms`);
              return of(null).pipe(delay(delayMs));
            }
          }),
          catchError(error => {
            console.error(`DocumentService: Erreur lors de la mise à jour du document ${documentId}:`, error);

            // Vérifier si c'est une erreur de timeout
            if (error.name === 'TimeoutError') {
              console.warn(`DocumentService: Timeout lors de la mise à jour du document ${documentId}`);
              // Retourner le document existant comme fallback
              return of(existingDocument);
            }

            return throwError(() => error);
          })
        );
      }),
      catchError(error => {
        console.error(`DocumentService: Erreur lors de la vérification du document ${documentId}:`, error);
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
   * Télécharge un document
   * @param documentId ID du document à télécharger
   */
  downloadDocument(documentId: number): Observable<Blob> {
    return this.http.get(`${this.API_URL}/documents/download/${documentId}`, {
      responseType: 'blob',
      withCredentials: true
    }).pipe(
      catchError(error => {
        console.error(`Erreur lors du téléchargement du document ${documentId}:`, error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Met à jour un document avec un nouveau fichier
   * @param documentId ID du document à mettre à jour
   * @param formData FormData contenant le fichier et les métadonnées
   * @returns Observable avec le document mis à jour
   */
  updateDocumentFile(documentId: number, formData: FormData): Observable<Document> {
    return this.http.put<DocumentResponse>(`${this.API_URL}/documents/${documentId}/file`, formData, {
      withCredentials: true
    }).pipe(
      map(response => Array.isArray(response.data) ? response.data[0] : response.data as Document),
      catchError(error => {
        console.error(`Erreur lors de la mise à jour du fichier pour le document ${documentId}:`, error);
        return throwError(() => error);
      })
    );
  }

  // Document sharing methods have been removed as part of the permissions system removal

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
