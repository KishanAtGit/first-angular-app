/*
 *  Protractor support is deprecated in Angular.
 *  Protractor is used in this example for compatibility with Angular documentation tools.
 */
import { bootstrapApplication, provideProtractorTestingSupport } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import routeConfig from './app/routes';
import { AppComponent } from './app/app.component';
import { provideStore } from '@ngrx/store';
import { counterReducer } from './app/store/counter.reducer';

bootstrapApplication(AppComponent, { providers: [provideProtractorTestingSupport(), provideRouter(routeConfig), provideStore({ counter: counterReducer })] }).catch((err) =>
  console.error(err),
);