import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';

import { CountriesService } from '../../shared/services/CountriesService';
import { SidenavService } from '../../shared/services';

import { TitleCasePipe } from '@angular/common';

import { Store } from '@ngrx/store';
import * as CountriesActions from '../+state/countries.actions';
import * as CountryActions from '../+state/country.actions';
import * as CountriesSelectors from '../+state/countries.selectors';
import { CountryEntity } from '../+state/countries.model';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { MatTableDataSource } from '@angular/material/table';

@UntilDestroy()
@Component({
  selector: 'app-countries-listing',
  templateUrl: './countries-listing.component.html',
  styleUrl: './countries-listing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountriesListingComponent implements OnInit {
  private store = inject(Store);

  private countriesService = inject(CountriesService);
  private sidenavService = inject(SidenavService);

  private titleCase = inject(TitleCasePipe);

  allCountries$ = this.store.select(CountriesSelectors.selectAll);
  dataSource = new MatTableDataSource<CountryEntity>();
  queryParams$ = this.store.select(CountriesSelectors.selectFilters);

  displayedColumns: string[] = [
    'position',
    'name',
    'code',
    'continent',
    'continent-code',
    'currency',
    'languages',
    'languages-code',
  ];
  searchTerm!: string;
  hasFilters$ = this.store.select(CountriesSelectors.selectHasFilters);

  private debounceTimeout: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    this.queryParams$.pipe(untilDestroyed(this)).subscribe((params) => {
      if (params['name']) {
        this.searchTerm = params['name'];
      }
    });

    this.store.dispatch(CountriesActions.loadCountries());

    this.allCountries$.pipe(untilDestroyed(this)).subscribe((countries) => {
      this.dataSource.data = countries;
    });
  }

  openDetails(code: string): void {
    if (code) {
      if (this.sidenavService.isDrawerOpen('filter')) {
        this.sidenavService.close('filter');
      }
      this.countriesService.updateCountryCode(code);
      this.store.dispatch(CountryActions.openCountrySidebar({ code }));
    }
  }

  openFilter(): void {
    if (this.sidenavService.isDrawerOpen('details')) {
      this.sidenavService.close('details');
    }
    this.sidenavService.open('filter');
  }

  search(event: Event) {
    if (this.sidenavService.isDrawerOpen('details')) {
      this.sidenavService.close('details');
    }

    this.searchTerm = (event.target as HTMLInputElement).value;

    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    this.debounceTimeout = setTimeout(() => {
      this.store.dispatch(
        CountriesActions.searchCountries({
          name: this.titleCase.transform(this.searchTerm),
        })
      );
    }, 600);
  }

  clearFilter(): void {
    this.store.dispatch(CountriesActions.clearFilters());
    this.searchTerm = '';
  }
}
