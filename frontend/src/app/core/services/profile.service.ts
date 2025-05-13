import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  // Dans un environnement réel, cette méthode ferait un appel API
  // Pour le moment, on utilise les données de l'utilisateur connecté
  getUserProfile(): Observable<User> {
    const currentUser = this.authService.getCurrentUser();
    return of(currentUser);
  }

  // Mock pour la mise à jour du profil
  updateProfile(userData: Partial<User>): Observable<User> {
    // Dans un environnement réel, cette méthode ferait un appel API PUT
    // Pour le moment, on simule une mise à jour réussie
    const currentUser = this.authService.getCurrentUser();
    const updatedUser = { ...currentUser, ...userData };

    // Mettre à jour les informations dans le localStorage
    localStorage.setItem('user_info', JSON.stringify(updatedUser));

    // Mettre à jour l'utilisateur dans le service d'authentification
    // Note: Ceci est une simulation, dans un environnement réel,
    // le service d'authentification serait mis à jour après un appel API réussi
    this.authService['currentUserSubject'].next(updatedUser);

    return of(updatedUser);
  }

  // Mock pour le changement de mot de passe
  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    // Dans un environnement réel, cette méthode ferait un appel API
    // Pour le moment, on simule une mise à jour réussie
    return of({ success: true, message: 'Mot de passe mis à jour avec succès' });
  }

  // Mock pour l'upload d'image de profil
  uploadProfileImage(file: File): Observable<any> {
    // Dans un environnement réel, cette méthode ferait un appel API avec FormData
    // Pour le moment, on simule un upload réussi avec une URL d'image aléatoire
    const currentUser = this.authService.getCurrentUser();
    const username = currentUser?.username || 'user';
    const mockImageUrl = `https://ui-avatars.com/api/?name=${username}&background=random`;

    // currentUser est déjà défini ci-dessus
    const updatedUser = { ...currentUser, profile_image: mockImageUrl };

    // Mettre à jour les informations dans le localStorage
    localStorage.setItem('user_info', JSON.stringify(updatedUser));

    // Mettre à jour l'utilisateur dans le service d'authentification
    this.authService['currentUserSubject'].next(updatedUser);

    return of({ success: true, imageUrl: mockImageUrl });
  }
}
