import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isBrowser: boolean;
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object // Inyecta PLATFORM_ID
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId); // Determina si estás en el navegador
  }
  

  

  register(data: { username: string, password: string, mail: string }): Observable<any> {
    return this.http.post('http://localhost:8080/api/auth/register', data);
  }

  login(data: { username: string, password: string }): Observable<any> {
  return this.http.post('http://localhost:8080/api/auth/login', data);
  }

  getToken(): string | null {
    if (this.isBrowser) { // Solo accede a localStorage si estás en el navegador
      return localStorage.getItem('token');
    }
    return null;
  }

  getUser(): any | null {
    if (this.isBrowser) { // Solo accede a localStorage si estás en el navegador
        const token = this.getToken(); // getToken ya verifica isBrowser
        if (token) {
            try {
                const user = localStorage.getItem('user');
                return user ? JSON.parse(user) : null;
            } catch (e) {
                console.error('Error al decodificar el token', e);
                return null;
            }
        }
    }
    return null;
  }

  isLoggedIn(): boolean {
    if (this.isBrowser) {
      return !!this.getToken();
    }
    return false; // Si no estás en el navegador, no hay sesión "loggeada" a través de localStorage
  }

  isAdmin(): boolean {
    if (this.isBrowser) {
      const user = this.getUser();
      return user?.role === 'ADMIN';
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}