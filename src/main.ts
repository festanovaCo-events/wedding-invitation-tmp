import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .then(() => document.getElementById('app-splash')?.remove())
  .catch((err) => {
    document.getElementById('app-splash')?.remove();
    console.error(err);
  });
