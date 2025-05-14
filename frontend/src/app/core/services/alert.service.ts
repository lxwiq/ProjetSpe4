import { Injectable, signal } from '@angular/core';

export interface Alert {
  id: number;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  autoClose: boolean;
  keepAfterRouteChange: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  // Signal pour les alertes
  alerts = signal<Alert[]>([]);
  private counter = 0;

  constructor() {}

  /**
   * Affiche un message de succès
   * @param message Message à afficher
   * @param options Options supplémentaires
   */
  success(message: string, options: { autoClose?: boolean; keepAfterRouteChange?: boolean } = {}): void {
    this.alert({
      type: 'success',
      message,
      autoClose: options.autoClose ?? true,
      keepAfterRouteChange: options.keepAfterRouteChange ?? false
    });
  }

  /**
   * Affiche un message d'erreur
   * @param message Message à afficher
   * @param options Options supplémentaires
   */
  error(message: string, options: { autoClose?: boolean; keepAfterRouteChange?: boolean } = {}): void {
    this.alert({
      type: 'error',
      message,
      autoClose: options.autoClose ?? true,
      keepAfterRouteChange: options.keepAfterRouteChange ?? false
    });
  }

  /**
   * Affiche un message d'information
   * @param message Message à afficher
   * @param options Options supplémentaires
   */
  info(message: string, options: { autoClose?: boolean; keepAfterRouteChange?: boolean } = {}): void {
    this.alert({
      type: 'info',
      message,
      autoClose: options.autoClose ?? true,
      keepAfterRouteChange: options.keepAfterRouteChange ?? false
    });
  }

  /**
   * Affiche un message d'avertissement
   * @param message Message à afficher
   * @param options Options supplémentaires
   */
  warning(message: string, options: { autoClose?: boolean; keepAfterRouteChange?: boolean } = {}): void {
    this.alert({
      type: 'warning',
      message,
      autoClose: options.autoClose ?? true,
      keepAfterRouteChange: options.keepAfterRouteChange ?? false
    });
  }

  /**
   * Affiche une alerte
   * @param alert Alerte à afficher
   */
  private alert(alert: Omit<Alert, 'id'>): void {
    const id = ++this.counter;
    const newAlert: Alert = { ...alert, id };
    
    // Ajouter l'alerte à la liste
    this.alerts.update(alerts => [...alerts, newAlert]);

    // Fermer automatiquement l'alerte après 5 secondes si autoClose est activé
    if (alert.autoClose) {
      setTimeout(() => this.remove(id), 5000);
    }
  }

  /**
   * Supprime une alerte
   * @param id ID de l'alerte à supprimer
   */
  remove(id: number): void {
    this.alerts.update(alerts => alerts.filter(alert => alert.id !== id));
  }

  /**
   * Supprime toutes les alertes
   */
  clear(): void {
    this.alerts.set([]);
  }
}
