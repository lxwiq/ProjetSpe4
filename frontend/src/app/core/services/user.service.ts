import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Récupère tous les utilisateurs actifs
   * @returns Observable avec la liste des utilisateurs
   */
  getAllActiveUsers(): Observable<User[]> {
    return this.http.get<any>(`${this.API_URL}/users`, { withCredentials: true })
      .pipe(
        map(response => {
          // Gérer à la fois les réponses directes et les réponses avec data
          const users = Array.isArray(response) ? response : (response.data || []);
          // Filtrer pour ne garder que les utilisateurs actifs
          return users.filter((user: any) => user.is_active !== false);
        }),
        catchError(error => {
          console.error('Erreur lors de la récupération des utilisateurs:', error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Recherche des utilisateurs par terme de recherche
   * @param query Terme de recherche
   * @returns Observable avec la liste des utilisateurs correspondants
   */
  searchUsers(query: string): Observable<User[]> {
    return this.http.get<any>(`${this.API_URL}/users/search`, {
      params: { q: query },
      withCredentials: true
    }).pipe(
      map(response => Array.isArray(response) ? response : (response.data || [])),
      catchError(error => {
        console.error('Erreur lors de la recherche des utilisateurs:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Récupère un utilisateur par son ID
   * @param userId ID de l'utilisateur
   * @returns Observable avec les détails de l'utilisateur
   */
  getUserById(userId: number): Observable<User> {
    return this.http.get<any>(`${this.API_URL}/users/${userId}`, { withCredentials: true })
      .pipe(
        map(response => response.data || response),
        catchError(error => {
          console.error(`Erreur lors de la récupération de l'utilisateur ${userId}:`, error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Récupère plusieurs utilisateurs par leurs IDs
   * @param userIds Liste des IDs d'utilisateurs
   * @returns Observable avec la liste des utilisateurs
   */
  getUsersByIds(userIds: number[]): Observable<User[]> {
    // Si la liste est vide, retourner un tableau vide
    if (!userIds || userIds.length === 0) {
      return new Observable(observer => {
        observer.next([]);
        observer.complete();
      });
    }

    // Construire la chaîne de requête pour les IDs
    const idsParam = userIds.join(',');

    return this.http.get<any>(`${this.API_URL}/users/batch`, {
      params: { ids: idsParam },
      withCredentials: true
    }).pipe(
      map(response => {
        // Gérer à la fois les réponses directes et les réponses avec data
        return Array.isArray(response) ? response : (response.data || []);
      }),
      catchError(error => {
        console.error('Erreur lors de la récupération des utilisateurs par IDs:', error);

        // En cas d'erreur, essayer de récupérer les utilisateurs un par un
        console.log('Tentative de récupération des utilisateurs un par un...');

        // Créer un tableau d'observables pour chaque utilisateur
        const userObservables = userIds.map(id => this.getUserById(id).pipe(
          catchError(err => {
            console.error(`Erreur lors de la récupération de l'utilisateur ${id}:`, err);
            // Retourner un utilisateur minimal en cas d'erreur
            return new Observable<User>(obs => {
              obs.next({ id, username: `Utilisateur ${id}` } as User);
              obs.complete();
            });
          })
        ));

        // Combiner les résultats
        return new Observable<User[]>(observer => {
          const users: User[] = [];
          let completed = 0;

          userObservables.forEach(obs => {
            obs.subscribe({
              next: user => users.push(user),
              error: err => {
                console.error('Erreur lors de la récupération d\'un utilisateur:', err);
                completed++;
                if (completed === userIds.length) {
                  observer.next(users);
                  observer.complete();
                }
              },
              complete: () => {
                completed++;
                if (completed === userIds.length) {
                  observer.next(users);
                  observer.complete();
                }
              }
            });
          });
        });
      })
    );
  }
}
