import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchbarInput } from '../../interfaces/searchbar_input_interface';
import { SearchbarInputDirective } from '../../directives/searchbar-input.directive';

@Component({
  selector: 'app-searchbar-input',
  standalone: true,
  imports: [CommonModule, SearchbarInputDirective],
  templateUrl: './searchbar-input.component.html',
  styleUrl: './searchbar-input.component.scss',
})
export class SearchbarInputComponent {
  @Output() emitSearchValue = new EventEmitter<string>();
  @Input() config?: SearchbarInput = {
    debounce: 200,
    placeholder: 'Busca aqui',
  };
}
