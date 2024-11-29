import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import {
  catchError,
  from,
  map,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';

import { CountriesService } from '../../shared/services/CountriesService';
import { SidenavService } from '../../shared/services/SidenavService';

import * as CountriesActions from './countries.actions';
import * as CountryActions from './country.actions';
import * as CountriesSelectors from '../+state/countries.selectors';

import { QueryParams } from './countries.model';

@Injectable()
export class CountriesEffect {
  private actions$ = inject(Actions);
  private store = inject(Store);

  private countriesService = inject(CountriesService);
  private sidenavService = inject(SidenavService);

  private filters$ = this.store.select(CountriesSelectors.selectFilters);
  private router = inject(Router);

  loadCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountriesActions.loadCountries, CountriesActions.setFilters),
      withLatestFrom(this.filters$),
      switchMap(([, filters]) =>
        this.countriesService.getCountries(filters).pipe(
          map((result) =>
            CountriesActions.loadCountriesSuccess({
              countries: result.data.countries,
            })
          ),
          catchError((error) =>
            of(CountriesActions.loadCountriesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loadCountrySuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CountryActions.openCountrySidebar),
        tap(({ code }) => {
          if (code) {
            this.sidenavService.open('details');
          }
        })
      ),
    { dispatch: false }
  );

  setFilters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountriesActions.setFilters),
      switchMap(({ filters }) => this.loadCountries(filters))
    )
  );

  clearFilters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountriesActions.clearFilters),
      switchMap(() => this.loadCountries({}))
    )
  );

  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountriesActions.searchCountries),
      switchMap(({ name }) => this.loadCountries({ name }))
    )
  );

  private loadCountries = (params: Partial<QueryParams> = {}) => {
    return of(params).pipe(
      withLatestFrom(this.filters$),
      map(([oldParams, newParams]) => {
        if (Object.keys(params).length === 0) {
          return {};
        }
        return {
          ...newParams,
          ...oldParams,
        };
      }),
      switchMap((newParams) => this.updateQueryParams(newParams)),
      map(() => CountriesActions.loadCountries())
    );
  };

  private updateQueryParams = (params: Partial<QueryParams>) => {
    const navigated = this.router.navigate([], {
      queryParams: params,
    });

    return from(navigated);
  };
}
