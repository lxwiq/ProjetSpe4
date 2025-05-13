import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Document } from '../models/document.model';
import { User } from '../models/user.model';

export interface Collaborator {
  user: User;
  permission_level: string;
  invitation_date: string;
}

export interface DocumentCollaborators {
  owner: User;
  collaborators: Collaborator[];
}

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>(`${this.apiUrl}/documents`);
  }

  getDocumentById(id: number): Observable<Document> {
    return this.http.get<Document>(`${this.apiUrl}/documents/${id}`);
  }

  createFolder(title: string, parentId?: number): Observable<Document> {
    return this.http.post<Document>(`${this.apiUrl}/documents`, {
      title,
      parent_folder_id: parentId,
      is_folder: true
    });
  }

  createDocument(title: string, content: string, parentId?: number): Observable<Document> {
    return this.http.post<Document>(`${this.apiUrl}/documents`, {
      title,
      content,
      parent_folder_id: parentId,
      is_folder: false
    });
  }

  updateDocument(id: number, data: Partial<Document>): Observable<Document> {
    return this.http.put<Document>(`${this.apiUrl}/documents/${id}`, data);
  }

  deleteDocument(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/documents/${id}`);
  }

  // Méthodes pour la collaboration
  getDocumentCollaborators(documentId: number): Observable<DocumentCollaborators> {
    return this.http.get<DocumentCollaborators>(`${this.apiUrl}/documents/${documentId}/collaborators`);
  }

  inviteUserToDocument(documentId: number, userId: number, permissionLevel: string = 'read'): Observable<any> {
    return this.http.post(`${this.apiUrl}/documents/${documentId}/invite`, {
      invitedUserId: userId,
      permissionLevel
    });
  }

  removeCollaborator(documentId: number, collaboratorId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/documents/${documentId}/collaborators/${collaboratorId}`);
  }
}
