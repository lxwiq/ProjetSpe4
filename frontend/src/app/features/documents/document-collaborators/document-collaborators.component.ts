import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DocumentService } from '../../../core/services/document.service';
import { AuthService } from '../../../core/services/auth.service';
import { ActiveDocumentUser, DocumentCollaborator, DocumentPermissionLevel } from '../../../core/models/document.model';

@Component({
  selector: 'app-document-collaborators',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './document-collaborators.component.html',
  styleUrls: ['./document-collaborators.component.css']
})
export class DocumentCollaboratorsComponent implements OnInit {
  @Input() documentId!: number;
  @Input() activeUsers: ActiveDocumentUser[] = [];

  collaborators: DocumentCollaborator[] = [];
  isLoading = false;
  error: string | null = null;

  // Pour l'invitation
  showInviteForm = false;
  inviteEmail = '';
  invitePermission: DocumentPermissionLevel = 'read';

  constructor(
    private documentService: DocumentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadCollaborators();
  }

  /**
   * Charge la liste des collaborateurs
   */
  loadCollaborators(): void {
    if (!this.documentId) return;

    this.isLoading = true;
    this.error = null;

    this.documentService.getDocumentCollaborators(this.documentId).subscribe({
      next: (collaborators) => {
        this.collaborators = collaborators;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des collaborateurs:', err);
        this.error = 'Impossible de charger les collaborateurs.';
        this.isLoading = false;
      }
    });
  }

  /**
   * Invite un utilisateur à collaborer
   */
  inviteCollaborator(): void {
    if (!this.documentId || !this.inviteEmail) return;

    this.isLoading = true;

    // Dans un cas réel, vous devriez d'abord rechercher l'utilisateur par email
    // pour obtenir son ID, puis l'inviter
    const mockUserId = 123; // Simulé pour l'exemple

    this.documentService.inviteCollaborator(this.documentId, {
      invitedUserId: mockUserId,
      permissionLevel: this.invitePermission
    }).subscribe({
      next: () => {
        this.loadCollaborators();
        this.resetInviteForm();
      },
      error: (err) => {
        console.error('Erreur lors de l\'invitation:', err);
        this.error = 'Impossible d\'inviter l\'utilisateur.';
        this.isLoading = false;
      }
    });
  }

  /**
   * Réinitialise le formulaire d'invitation
   */
  resetInviteForm(): void {
    this.inviteEmail = '';
    this.invitePermission = 'read';
    this.showInviteForm = false;
    this.isLoading = false;
  }

  /**
   * Vérifie si un utilisateur est actuellement actif
   * @param userId ID de l'utilisateur
   * @returns true si l'utilisateur est actif
   */
  isUserActive(userId: number): boolean {
    return this.activeUsers.some(user => user.id === userId);
  }

  /**
   * Formate une date pour l'affichage
   * @param dateString Date au format ISO
   * @returns Date formatée
   */
  formatDate(dateString?: string): string {
    if (!dateString) return '';

    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  /**
   * Traduit le niveau de permission en français
   * @param level Niveau de permission
   * @returns Traduction française
   */
  translatePermission(level: DocumentPermissionLevel): string {
    switch (level) {
      case 'read': return 'Lecture';
      case 'write': return 'Écriture';
      case 'admin': return 'Administration';
      default: return level;
    }
  }
}
