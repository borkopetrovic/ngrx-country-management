import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';

import { combineLatest, map } from 'rxjs';

import { SidenavService } from '../../shared/services/SidenavService';
import { CountriesService } from '../../shared/services/CountriesService';

import * as CountriesSelectors from '../+state/countries.selectors';

import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-countries-details',
  templateUrl: './countries-details.component.html',
  styleUrl: './countries-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountriesDetailsComponent implements AfterViewInit {
  @ViewChild('drawerDetails') drawerDetails!: MatDrawer;

  private store = inject(Store);
  private countriesService = inject(CountriesService);
  private sidenavService = inject(SidenavService);

  allCountries$ = this.store.select(CountriesSelectors.selectAll);
  loaded$ = this.store.select(CountriesSelectors.selectCountriesLoaded);

  countries$ = combineLatest([this.loaded$, this.allCountries$]).pipe(
    map(([loaded, countries]) => {
      if (loaded) {
        return countries;
      }

      return [];
    })
  );

  code$ = this.countriesService.code$;
  country$ = combineLatest([this.code$, this.countries$]).pipe(
    map(([code, countries]) => {
      if (code) {
        return countries.find((country) => country.code === code);
      }

      return null;
    })
  );

  ngAfterViewInit(): void {
    this.sidenavService.setDrawer(this.drawerDetails, 'details');
  }

  closeDrawer(): void {
    this.sidenavService.close('details');
  }
}
