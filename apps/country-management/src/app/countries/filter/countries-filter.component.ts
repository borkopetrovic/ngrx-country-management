import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, startWith } from 'rxjs';

import { SidenavService } from '../../shared/services';

import { Store } from '@ngrx/store';
import * as CountriesActions from '../+state/countries.actions';
import * as CountriesSelectors from '../+state/countries.selectors';
import { CountryEntity, QueryParams } from '../+state/countries.model';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { MatDrawer } from '@angular/material/sidenav';

@UntilDestroy()
@Component({
  selector: 'app-countries-filter',
  templateUrl: './countries-filter.component.html',
  styleUrl: './countries-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountriesFilterComponent implements OnInit, AfterViewInit {
  @ViewChild('drawerFilter') drawerFilter!: MatDrawer;

  private sidenavService = inject(SidenavService);
  private store = inject(Store);
  private fb = inject(FormBuilder);

  allCountries$ = this.store.select(CountriesSelectors.selectAll);
  options!: CountryEntity[];
  queryParams$ = this.store.select(CountriesSelectors.selectFilters);

  form = this.fb.group({
    code: [''],
    continent: [''],
    currency: [''],
  });

  codes = this.f['code'].valueChanges.pipe(
    startWith(''),
    map((value) => this._filter('code', value || ''))
  );

  continents = this.f['continent'].valueChanges.pipe(
    startWith(''),
    map((value) => this._filter('continent', value || ''))
  );

  currencies = this.f['currency'].valueChanges.pipe(
    startWith(''),
    map((value) => this._filter('currency', value || ''))
  );

  ngOnInit(): void {
    this.queryParams$.pipe(untilDestroyed(this)).subscribe((params) => {
      this.f['code'].setValue(params['code']);
      this.f['continent'].setValue(params['continent']);
      this.f['currency'].setValue(params['currency']);
    });

    this.allCountries$.pipe(untilDestroyed(this)).subscribe((countries) => {
      this.options = countries;
    });
  }

  ngAfterViewInit(): void {
    this.sidenavService.setDrawer(this.drawerFilter, 'filter');
  }

  closeDrawer(): void {
    this.sidenavService.close('filter');
  }

  private _filter(type: string, value: string): string[] {
    const filterValue = value.toLowerCase();
    const dataArray = [
      ...new Set(
        this.options
          .map((item) =>
            type === 'continent'
              ? item[type]['code']
              : item[type as keyof CountryEntity]
          )
          .filter((i) => i !== null)
      ),
    ];
    return dataArray.filter((item) =>
      (item as string).toLowerCase().includes(filterValue)
    ) as string[];
  }

  applyFilter(): void {
    this.store.dispatch(
      CountriesActions.setFilters({ filters: this.form.value as QueryParams })
    );
  }

  get f(): FormGroup['controls'] {
    return this.form.controls;
  }
}
