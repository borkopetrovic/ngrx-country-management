import { inject, Injectable } from '@angular/core';

import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, Observable } from 'rxjs';

import {
  CountryEntity,
  LanguageEntity,
  ContinentEntity,
  QueryParams,
} from '../../countries/+state/countries.model';

export const GET_COUNTRIES = gql`
  query GetCountries(
    $code: StringQueryOperatorInput
    $continent: StringQueryOperatorInput
    $currency: StringQueryOperatorInput
    $name: StringQueryOperatorInput
  ) {
    countries(
      filter: {
        code: $code
        continent: $continent
        currency: $currency
        name: $name
      }
    ) {
      name
      code
      currency
      continent {
        code
        name
      }
      languages {
        code
        name
      }
    }
  }
`;

const GET_COUNTRY = gql`
  query GetCountry($code: ID!) {
    country(code: $code) {
      name
      code
      currency
      continent {
        code
        name
      }
      languages {
        code
        name
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private apollo = inject(Apollo);

  private code = new BehaviorSubject<string>('');
  code$ = this.code.asObservable();

  getCountries(filters: QueryParams): Observable<any> {
    const variables = filters
      ? {
          ...(filters.code && { code: { eq: filters.code } }),
          ...(filters.continent && { continent: { eq: filters.continent } }),
          ...(filters.currency && { currency: { eq: filters.currency } }),
          ...(filters.name && { name: { eq: filters.name } }),
        }
      : {};
    return this.apollo.watchQuery<{ countries: CountryEntity[] }>({
      query: GET_COUNTRIES,
      variables,
    }).valueChanges;
  }

  getCountryDetails(code: string): Observable<any> {
    return this.apollo.watchQuery<CountryEntity>({
      query: GET_COUNTRY,
      variables: { code },
    }).valueChanges;
  }

  updateCountryCode(value: string): void {
    this.code.next(value);
  }

  getCurrentCountryCode(): string {
    return this.code.getValue();
  }

  getContinent(
    continent: ContinentEntity,
    prop: keyof ContinentEntity
  ): string {
    return continent[prop];
  }

  getLanguages(
    languages: LanguageEntity[],
    prop: keyof LanguageEntity
  ): string {
    return languages.map((language) => language[prop]).join(', ');
  }

  getLanguagesCodes(languages: Array<LanguageEntity>): string {
    return languages.map((language) => language.code).join(', ');
  }
}
