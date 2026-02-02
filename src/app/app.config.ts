import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { routes } from './app.routes';
import { authInterceptor } from './interceptor/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    
    // Added withFetch() here ───────────────────────────────┐
    provideHttpClient(
      withInterceptors([authInterceptor]),
      withFetch()                    // ← enables native fetch backend
    ),
    // ────────────────────────────────────────────────────────┘

    provideClientHydration(withEventReplay())
  ]
};