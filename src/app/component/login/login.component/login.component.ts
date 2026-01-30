import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth/auth.service';
import { LoginRequest } from '../../../models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials: LoginRequest = {
    username: '',
    password: ''
  };
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    // Redirect if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/employees']);
    }
  }

  login(): void {
    this.errorMessage = '';
    this.loading = true;

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.loading = false;
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        console.error('Login error:', err);
        this.errorMessage = 'Invalid username or password';
        this.loading = false;
      }
    });
  }
}
