export interface CountryEntity {
  name: string;
  code: string;
  continent: ContinentEntity;
  currency: string;
  languages: LanguageEntity[];
}

export interface ContinentEntity {
  name: string;
  code: string;
}

export interface LanguageEntity {
  name: string;
  code: string;
}

export interface QueryParams {
  code?: string;
  continent?: string;
  currency?: string;
  name?: string;
}
