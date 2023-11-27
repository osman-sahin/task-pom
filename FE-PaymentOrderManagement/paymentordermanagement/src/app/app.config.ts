import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { GlobalService } from './services/global.service';
import { provideHttpClient, withFetch, withJsonpSupport } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), GlobalService,
    provideHttpClient(withJsonpSupport())]
};
