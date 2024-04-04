import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PendingNumbersComponent } from '../pending-numbers/pending-numbers.component';
import { ModalControllerService } from '../../../../utilities/modal/modal-controller-service';
import { IRifa } from '../../../../interfaces/rifa_interface';

@Component({
  selector: 'app-product-information',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-information.component.html',
  styleUrl: './product-information.component.scss',
})
export class ProductInformationComponent {
  @Input() rifa?: IRifa;

  constructor(private _modalSv: ModalControllerService) {}

  async openModal() {
    await this._modalSv.create(PendingNumbersComponent, undefined, {
      numbers: this.rifa?.numbers,
      price: this.rifa?.price,
    });
  }
}
