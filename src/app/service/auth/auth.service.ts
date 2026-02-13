import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoginRequest, LoginResponse } from '../../models/auth.model';
@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiUrl = 'http://localhost:8848/api/check/auth';
  private tokenKey = 'auth_token';
  private userKey = 'current_user';

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      credentials
    ).pipe(
      tap(res => this.storeAuth(res))
    );
  }

  private storeAuth(response: LoginResponse): void {
    localStorage.setItem(this.tokenKey, response.token);
    localStorage.setItem(this.userKey, JSON.stringify({
      role: response.role,
      createdAt: response.createdAt
    }));
  }

  logout(): void {
    localStorage.clear();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem(this.userKey) || '{}');
    return user?.role === 'ADMIN';
  }

  getUserRole(): string | null {
  const user = JSON.parse(localStorage.getItem('current_user') || '{}');
  return user?.role ?? null;
}

hasRole(roles: string[]): boolean {
  const role = this.getUserRole();
  return !!role && roles.includes(role);
}

getCurrentUser(): { role: string; createdAt: string } | null {
  const user = localStorage.getItem(this.userKey);
  return user ? JSON.parse(user) : null;
}


}
