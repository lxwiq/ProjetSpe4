import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export interface EventData {
  type: string;
  payload: any;
}

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  private eventSubject = new Subject<EventData>();

  /**
   * Émet un événement avec un type et des données
   * @param type Type d'événement
   * @param payload Données associées à l'événement
   */
  emit(type: string, payload: any = {}): void {
    this.eventSubject.next({ type, payload });
  }

  /**
   * S'abonne à un type d'événement spécifique
   * @param type Type d'événement à écouter
   * @returns Observable émettant les données de l'événement
   */
  on<T>(type: string): Observable<T> {
    return this.eventSubject.asObservable().pipe(
      filter(event => event.type === type),
      map(event => event.payload as T)
    );
  }
}
