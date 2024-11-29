import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { Store } from '@ngrx/store';
import * as CountriesSelectors from '../countries/+state/countries.selectors';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountriesComponent {
  private store = inject(Store);
  error$ = this.store.select(CountriesSelectors.selectCountriesError);
}
