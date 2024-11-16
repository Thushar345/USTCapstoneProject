import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app/app.component'; // Root component
import { routes } from './app/app.routes'; // Application routes

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),                 // Provide routing configuration
    importProvidersFrom(HttpClientModule)   // Import HttpClientModule for HTTP requests
  ],
}).catch((err) => console.error(err));
