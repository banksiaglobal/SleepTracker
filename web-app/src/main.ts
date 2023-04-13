import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { APP_ROUTES as routes } from './app/routing';
import { environment } from './environment/env';

if (environment) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),

    importProvidersFrom(
      [BrowserAnimationsModule, HttpClientModule],
      BrowserAnimationsModule
    ),
  ],
}).catch((err) => console.error(err));
