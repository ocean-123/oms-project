import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoginRequest, LoginResponse } from '../../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private tokenKey = 'auth_token';
  private userKey = 'current_user';

  // Static credentials for demo
  private staticUser = {
    username: 'admin',
    password: 'admin123',
    role: 'ADMIN'
  };

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    // Try API first, fallback to static auth
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => this.handleAuthResponse(response)),
      catchError(() => {
        // Fallback to static authentication
        return this.staticLogin(credentials);
      })
    );
  }

  staticLogin(credentials: LoginRequest): Observable<LoginResponse> {
    if (credentials.username === this.staticUser.username && 
        credentials.password === this.staticUser.password) {
      const response: LoginResponse = {
        token: 'static-token-' + Date.now(),
        username: this.staticUser.username,
        role: this.staticUser.role
      };
      this.handleAuthResponse(response);
      return of(response);
    } else {
      throw new Error('Invalid credentials');
    }
  }

  private handleAuthResponse(response: LoginResponse): void {
    localStorage.setItem(this.tokenKey, response.token);
    localStorage.setItem(this.userKey, JSON.stringify({
      username: response.username,
      role: response.role
    }));
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getCurrentUser(): any {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'ADMIN';
  }
}
