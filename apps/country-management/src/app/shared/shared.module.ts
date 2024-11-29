import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { ContinentPipe, LanguagePipe } from './pipes';

import {
  LoaderComponent,
  NotFoundComponent,
  SearchComponent,
} from './components';

@NgModule({
  declarations: [
    LoaderComponent,
    NotFoundComponent,
    SearchComponent,
    ContinentPipe,
    LanguagePipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatAutocompleteModule,
  ],
  exports: [
    LoaderComponent,
    NotFoundComponent,
    SearchComponent,
    ContinentPipe,
    LanguagePipe,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatAutocompleteModule,
  ],
})
export class SharedModule {}
