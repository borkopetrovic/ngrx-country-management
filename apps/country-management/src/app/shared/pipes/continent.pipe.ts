import { inject, Pipe, PipeTransform } from '@angular/core';

import { CountriesService } from './../services/CountriesService';
import { ContinentEntity } from '../../countries/+state/countries.model';

@Pipe({
  name: 'continent',
})
export class ContinentPipe implements PipeTransform {
  private countriesService = inject(CountriesService);

  transform(continent: ContinentEntity, prop: keyof ContinentEntity): string {
    return this.countriesService.getContinent(continent, prop);
  }
}
