import { createReducer, on } from '@ngrx/store';
import { CountryEntity, QueryParams } from './countries.model';
import * as CountriesActions from './countries.actions';
import * as CountryActions from './country.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export const COUNTRIES_FEATURE_KEY = 'countries';

export interface CountriesState extends EntityState<CountryEntity> {
  loading: boolean;
  loaded: boolean;
  error?: string | null;
  code: string;
  filters: QueryParams;
}

const selectId = (country: CountryEntity) => country.code;

export const countriesAdapter: EntityAdapter<CountryEntity> =
  createEntityAdapter<CountryEntity>({
    selectId,
    sortComparer: false,
  });

export const initialCountriesState: CountriesState =
  countriesAdapter.getInitialState({
    loading: false,
    loaded: false,
    code: '',
    filters: {
      code: '',
      continent: '',
      currency: '',
      name: '',
    },
  });

export const countriesReducer = createReducer(
  initialCountriesState,
  on(CountriesActions.loadCountries, (state) => ({
    ...state,
    loading: true,
  })),
  on(CountriesActions.loadCountriesSuccess, (state, { countries }) =>
    countriesAdapter.setAll(countries, {
      ...state,
      loading: false,
      loaded: true,
    })
  ),
  on(CountriesActions.loadCountriesFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(CountryActions.openCountrySidebar, (state, { code }) => ({
    ...state,
    code,
  })),
  on(CountriesActions.setFilters, (state, { filters }) => ({
    ...state,
    filters: {
      ...state.filters,
      code: filters.code ?? state.filters.code,
      continent: filters.continent ?? state.filters.continent,
      currency: filters.currency ?? state.filters.currency,
    },
    loading: true,
  })),
  on(CountriesActions.searchCountries, (state) => ({
    ...state,
    loading: true,
  }))
);
