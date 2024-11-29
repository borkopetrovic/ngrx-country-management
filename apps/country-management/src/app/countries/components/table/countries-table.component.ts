import { Component, EventEmitter, inject, Input, Output } from '@angular/core';

import { Store } from '@ngrx/store';
import * as CountriesSelectors from '../../+state/countries.selectors';
import { CountryEntity } from '../../+state/countries.model';

import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-countries-table',
  templateUrl: './countries-table.component.html',
  styleUrl: './countries-table.component.scss',
})
export class CountriesTableComponent {
  @Output() select = new EventEmitter<string>();
  @Input() dataSource = new MatTableDataSource<CountryEntity>();
  @Input() displayedColumns!: string[];

  private store = inject(Store);
  loading$ = this.store.select(CountriesSelectors.selectCountriesLoading);

  handleSelect(code: string): void {
    this.select.emit(code);
  }
}
