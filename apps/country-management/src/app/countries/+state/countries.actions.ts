import { createAction, props } from '@ngrx/store';

import { CountryEntity, QueryParams } from './countries.model';

export const loadCountries = createAction('[Countries][API] Load Countries');

export const loadCountriesSuccess = createAction(
  '[Countries][API] Load Countries Success',
  props<{ countries: CountryEntity[] }>()
);

export const loadCountriesFailure = createAction(
  '[Countries][API] Load Countries Failure',
  props<{ error: any }>()
);

export const setFilters = createAction(
  '[Countries][API] Set Countries Filters',
  props<{
    filters: QueryParams;
  }>()
);

export const clearFilters = createAction(
  '[Countries][API] Clear Countries Filters'
);

export const searchCountries = createAction(
  '[Countries][API] Search Countries',
  props<{ name: string }>()
);
