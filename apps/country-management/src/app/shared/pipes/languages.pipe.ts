import { inject, Pipe, PipeTransform } from '@angular/core';

import { CountriesService } from './../services/CountriesService';
import { LanguageEntity } from '../../countries/+state/countries.model';

@Pipe({
  name: 'languageList',
})
export class LanguagePipe implements PipeTransform {
  private countriesService = inject(CountriesService);

  transform(languages: LanguageEntity[], prop: keyof LanguageEntity): string {
    return this.countriesService.getLanguages(languages, prop);
  }
}
