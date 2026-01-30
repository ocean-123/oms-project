import { Component, OnInit, OnDestroy } from '@angular/core';  // ✅ ADD OnInit, OnDestroy
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './service/auth/auth.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {  // ✅ IMPLEMENT INTERFACES
  title = 'Office Management System';
  
  isDashboardHidden = false;
  
  // ✅ DECLARE THE PROPERTY HERE (THIS WAS MISSING!)
  private routerSubscription!: Subscription;

    // ADD THIS PROPERTY AND METHOD (2 lines!)
  sidebarOpen = false;

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }



  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {  // ✅ NOW WORKS
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects;
      const isLoggedIn = this.authService.isLoggedIn();
      
      this.isDashboardHidden = !isLoggedIn || url === '/login' || url === '/';
      
      if (isLoggedIn && url === '/dashboard') {
        this.isDashboardHidden = false;
      }
    });
  }

  ngOnDestroy() {  // ✅ NOW WORKS
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  get userInitial(): string {
    const user = this.authService.getCurrentUser();
    return user?.username ? user.username.charAt(0).toUpperCase() : 'A';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
