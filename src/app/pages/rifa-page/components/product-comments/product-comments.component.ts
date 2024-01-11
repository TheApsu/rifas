import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchbarInputComponent } from '../../../../general-components/searchbar-input/searchbar-input.component';
import { SearchbarInput } from '../../../../interfaces/searchbar_input_interface';

@Component({
  selector: 'app-product-comments',
  standalone: true,
  imports: [CommonModule, SearchbarInputComponent],
  templateUrl: './product-comments.component.html',
  styleUrl: './product-comments.component.scss',
})
export class ProductCommentsComponent {
  public config: SearchbarInput = {
    debounce: 0,
    placeholder: 'Escribe tu pregunta...',
  };
  private _comment: string = '';

  setValue(value: string) {
    this._comment = value;
  }

  send() {
    console.log('this._comment :>> ', this._comment);
  }
}
