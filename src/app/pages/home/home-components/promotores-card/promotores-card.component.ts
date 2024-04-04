import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../../interfaces/user_interface';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-promotores-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promotores-card.component.html',
  styleUrl: './promotores-card.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PromotoresCardComponent {
  @Input() promotor!: User;
  public url = environment.uploads;
}
