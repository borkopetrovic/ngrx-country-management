import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  COUNTRIES_FEATURE_KEY,
  countriesAdapter,
  CountriesState,
} from './countries.reducer';
import { RouterReducerState } from '@ngrx/router-store';

export const selectCountriesState = createSelector(
  createFeatureSelector<CountriesState>(COUNTRIES_FEATURE_KEY),
  (state: CountriesState) => state
);

export const { selectAll } =
  countriesAdapter.getSelectors(selectCountriesState);

export const selectCountriesLoading = createSelector(
  selectCountriesState,
  (state: CountriesState) => state.loading
);

export const selectCountriesLoaded = createSelector(
  selectCountriesState,
  (state: CountriesState) => state.loaded
);

export const selectCountriesError = createSelector(
  selectCountriesState,
  (state: CountriesState) => state.error
);

export const selectCountryCode = createSelector(
  selectCountriesState,
  (state: CountriesState) => state.code
);

export const selectRouter = createFeatureSelector<RouterReducerState>('router');

export const selectFilters = createSelector(
  selectRouter,
  (routerState: RouterReducerState) => routerState?.state?.root?.queryParams
);

export const selectHasFilters = createSelector(selectFilters, (filters) =>
  Object.keys(filters).some(
    (key) => filters[key] !== '' && filters[key] !== null
  )
);
