import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProductComponent } from '../home/home-components/card-product/card-product.component';
import { PagerComponent } from '../../general-components/pager/pager.component';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, CardProductComponent, PagerComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  public arr = new Array(12);
}
