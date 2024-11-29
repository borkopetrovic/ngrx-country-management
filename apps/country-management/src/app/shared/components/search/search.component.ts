import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  @Input() searchValue!: string;
  @Output() search = new EventEmitter<Event>();

  handleSearch(value: Event): void {
    this.search.emit(value);
  }
}
