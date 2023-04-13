import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { APP_ROUTES as routes } from './app/routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from './environment/env';
import { JWTInterceptor } from './app/share/interceptor';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    {
      //injection token
      provide: HTTP_INTERCEPTORS,
      useClass: JWTInterceptor,
      //implemented array  of interceptors
      multi: true,
    },

    importProvidersFrom([BrowserAnimationsModule, HttpClientModule]),
  ],
}).catch((err) => console.error(err));
