import { inject, NgModule, provideZoneChangeDetection } from '@angular/core';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  routerReducer,
  StoreRouterConnectingModule,
  RouterState,
} from '@ngrx/router-store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot({ router: routerReducer }),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal,
    }),
    EffectsModule.forRoot(),
  ],
  exports: [],
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptorsFromDi()),
    provideApollo(() => {
      const httpLink = inject(HttpLink);

      return {
        link: httpLink.create({ uri: 'https://countries.trevorblades.com/' }),
        cache: new InMemoryCache(),
      };
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
