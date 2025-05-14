/**
 * Gestionnaire de curseurs pour l'édition collaborative
 * Permet d'afficher les curseurs des autres utilisateurs dans l'éditeur Quill
 */
export class CursorManager {
  private cursors: Map<number, CursorInfo> = new Map();
  private editor: any;
  private container: HTMLElement;
  private currentUserId: number;

  constructor(editor: any, currentUserId: number) {
    this.editor = editor;
    this.currentUserId = currentUserId;
    this.container = this.editor.container.querySelector('.ql-editor');
  }

  /**
   * Met à jour la position d'un curseur
   * @param userId ID de l'utilisateur
   * @param username Nom de l'utilisateur
   * @param position Position du curseur
   * @param color Couleur du curseur (optionnelle)
   */
  updateCursor(userId: number, username: string, position: { index: number, length: number }, color?: string): void {
    // Ne pas afficher le curseur de l'utilisateur courant
    if (userId === this.currentUserId) {
      return;
    }

    // Générer une couleur si non fournie
    if (!color) {
      color = this.getColorForUser(userId);
    }

    // Créer ou mettre à jour le curseur
    let cursorInfo = this.cursors.get(userId);
    
    if (!cursorInfo) {
      // Créer les éléments du curseur
      const cursorElement = document.createElement('div');
      cursorElement.className = 'ql-cursor';
      
      const caretElement = document.createElement('div');
      caretElement.className = 'ql-cursor-caret';
      caretElement.style.backgroundColor = color;
      
      const flagElement = document.createElement('div');
      flagElement.className = 'ql-cursor-flag';
      flagElement.style.backgroundColor = color;
      flagElement.textContent = username;
      
      const selectionElement = document.createElement('div');
      selectionElement.className = 'ql-cursor-selection';
      selectionElement.style.backgroundColor = color;
      
      cursorElement.appendChild(caretElement);
      cursorElement.appendChild(flagElement);
      cursorElement.appendChild(selectionElement);
      
      this.container.appendChild(cursorElement);
      
      cursorInfo = {
        userId,
        username,
        color,
        element: cursorElement,
        caret: caretElement,
        flag: flagElement,
        selection: selectionElement,
        position
      };
      
      this.cursors.set(userId, cursorInfo);
    } else {
      // Mettre à jour les informations du curseur
      cursorInfo.position = position;
      cursorInfo.username = username;
      
      // Mettre à jour le texte du drapeau
      cursorInfo.flag.textContent = username;
    }
    
    // Mettre à jour la position du curseur
    this.updateCursorPosition(cursorInfo);
  }

  /**
   * Met à jour la position visuelle d'un curseur
   * @param cursorInfo Informations du curseur
   */
  private updateCursorPosition(cursorInfo: CursorInfo): void {
    const { position, element, caret, flag, selection } = cursorInfo;
    
    try {
      // Obtenir les coordonnées du curseur
      const startRange = this.editor.getSelection(position.index, 0);
      if (!startRange || !startRange.index) {
        return;
      }
      
      const bounds = this.editor.getBounds(position.index);
      
      // Positionner le curseur
      caret.style.height = bounds.height + 'px';
      caret.style.top = bounds.top + 'px';
      caret.style.left = bounds.left + 'px';
      
      // Positionner le drapeau
      flag.style.top = (bounds.top - 14) + 'px';
      flag.style.left = bounds.left + 'px';
      
      // Afficher la sélection si nécessaire
      if (position.length > 0) {
        const endBounds = this.editor.getBounds(position.index + position.length);
        
        // Gérer la sélection sur une seule ligne
        if (endBounds.top === bounds.top) {
          selection.style.top = bounds.top + 'px';
          selection.style.left = bounds.left + 'px';
          selection.style.width = (endBounds.left - bounds.left) + 'px';
          selection.style.height = bounds.height + 'px';
          selection.style.display = 'block';
        } else {
          // Pour les sélections multi-lignes, on pourrait implémenter une logique plus complexe
          // Pour l'instant, on cache simplement la sélection
          selection.style.display = 'none';
        }
      } else {
        selection.style.display = 'none';
      }
      
      // Afficher le curseur
      element.style.display = 'block';
      
      // Ajouter une animation pour faire clignoter le curseur
      caret.style.animation = 'cursor-blink 1s infinite';
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la position du curseur:', error);
    }
  }

  /**
   * Supprime le curseur d'un utilisateur
   * @param userId ID de l'utilisateur
   */
  removeCursor(userId: number): void {
    const cursorInfo = this.cursors.get(userId);
    
    if (cursorInfo) {
      // Supprimer l'élément du DOM
      if (cursorInfo.element && cursorInfo.element.parentNode) {
        cursorInfo.element.parentNode.removeChild(cursorInfo.element);
      }
      
      // Supprimer de la map
      this.cursors.delete(userId);
    }
  }

  /**
   * Supprime tous les curseurs
   */
  removeAllCursors(): void {
    this.cursors.forEach((cursorInfo) => {
      if (cursorInfo.element && cursorInfo.element.parentNode) {
        cursorInfo.element.parentNode.removeChild(cursorInfo.element);
      }
    });
    
    this.cursors.clear();
  }

  /**
   * Génère une couleur pour un utilisateur basée sur son ID
   * @param userId ID de l'utilisateur
   * @returns Couleur au format hexadécimal
   */
  private getColorForUser(userId: number): string {
    // Liste de couleurs prédéfinies pour les curseurs
    const colors = [
      '#FF5733', // Rouge-orange
      '#33A8FF', // Bleu clair
      '#33FF57', // Vert clair
      '#FF33A8', // Rose
      '#A833FF', // Violet
      '#FF9F33', // Orange
      '#33FFF9', // Cyan
      '#9FFF33', // Vert-jaune
      '#FF33F5', // Magenta
      '#33FFB8'  // Turquoise
    ];
    
    // Utiliser l'ID de l'utilisateur pour choisir une couleur
    return colors[userId % colors.length];
  }
}

/**
 * Interface pour les informations d'un curseur
 */
interface CursorInfo {
  userId: number;
  username: string;
  color: string;
  element: HTMLElement;
  caret: HTMLElement;
  flag: HTMLElement;
  selection: HTMLElement;
  position: { index: number, length: number };
}
