import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  login(mail: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}`, { mail, password });
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}
