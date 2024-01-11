import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CardProductComponent {
  @Input() product: any;
}
