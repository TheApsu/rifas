import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PendingNumbersComponent } from '../pending-numbers/pending-numbers.component';
import { ModalControllerService } from '../../../../utilities/modal/modal-controller-service';

@Component({
  selector: 'app-product-information',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-information.component.html',
  styleUrl: './product-information.component.scss',
})
export class ProductInformationComponent {
  constructor(private _modalSv: ModalControllerService) {}

  async openModal() {
    await this._modalSv.create(PendingNumbersComponent, undefined);
  }
}
