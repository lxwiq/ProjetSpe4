import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';

export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
  full_name?: string;
  is_admin?: boolean;
}

export interface AdminResponse<T> {
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Récupère tous les utilisateurs (y compris les inactifs)
   * @returns Observable avec la liste des utilisateurs
   */
  getAllUsers(): Observable<User[]> {
    return this.http.get<AdminResponse<User[]>>(`${this.API_URL}/admin/users`, { withCredentials: true })
      .pipe(
        map(response => response.data || []),
        catchError(error => {
          console.error('Erreur lors de la récupération des utilisateurs:', error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Crée un nouvel utilisateur
   * @param userData Données de l'utilisateur à créer
   * @returns Observable avec l'utilisateur créé
   */
  createUser(userData: CreateUserRequest): Observable<User> {
    return this.http.post<AdminResponse<User>>(`${this.API_URL}/admin/users`, userData, { withCredentials: true })
      .pipe(
        map(response => response.data),
        catchError(error => {
          console.error('Erreur lors de la création de l\'utilisateur:', error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Désactive un compte utilisateur
   * @param userId ID de l'utilisateur à désactiver
   * @returns Observable avec l'utilisateur mis à jour
   */
  deactivateUser(userId: number): Observable<User> {
    return this.http.put<AdminResponse<User>>(`${this.API_URL}/admin/users/${userId}/deactivate`, {}, { withCredentials: true })
      .pipe(
        map(response => response.data),
        catchError(error => {
          console.error(`Erreur lors de la désactivation de l'utilisateur ${userId}:`, error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Réactive un compte utilisateur
   * @param userId ID de l'utilisateur à réactiver
   * @returns Observable avec l'utilisateur mis à jour
   */
  activateUser(userId: number): Observable<User> {
    return this.http.put<AdminResponse<User>>(`${this.API_URL}/admin/users/${userId}/activate`, {}, { withCredentials: true })
      .pipe(
        map(response => response.data),
        catchError(error => {
          console.error(`Erreur lors de la réactivation de l'utilisateur ${userId}:`, error);
          return throwError(() => error);
        })
      );
  }
}
