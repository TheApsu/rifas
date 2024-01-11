import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-promotores-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promotores-card.component.html',
  styleUrl: './promotores-card.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PromotoresCardComponent {}
