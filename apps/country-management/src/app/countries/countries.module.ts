import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { TitleCasePipe } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromCountries from './+state/countries.reducer';
import { CountriesEffect } from './+state/countries.effects';

import { CountriesRoutingModule } from './countries-routing.module';
import { CountriesComponent } from './countries.component';
import { CountriesListingComponent } from './listing/countries-listing.component';
import { CountriesDetailsComponent } from './details/countries-details.component';
import { CountriesTableComponent } from './components';
import { CountriesFilterComponent } from './filter/countries-filter.component';

@NgModule({
  declarations: [
    CountriesComponent,
    CountriesListingComponent,
    CountriesDetailsComponent,
    CountriesTableComponent,
    CountriesFilterComponent,
  ],
  imports: [
    CountriesRoutingModule,
    StoreModule.forFeature(
      fromCountries.COUNTRIES_FEATURE_KEY,
      fromCountries.countriesReducer
    ),
    EffectsModule.forFeature([CountriesEffect]),
    SharedModule,
  ],
  providers: [TitleCasePipe],
})
export class CountriesModule {}
