import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  constructor( private http: HttpClient) { }

  getDocuments() {
    return this.http.get<any[]>('http://localhost:3000/documents');
  }
}
