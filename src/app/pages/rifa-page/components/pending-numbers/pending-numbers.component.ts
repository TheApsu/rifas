import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalControllerService } from '../../../../utilities/modal/modal-controller-service';

@Component({
  selector: 'app-pending-numbers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pending-numbers.component.html',
  styleUrl: './pending-numbers.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PendingNumbersComponent implements OnInit {
  numbers = new Array(100);
  constructor(private _modalCtrl: ModalControllerService) {}

  ngOnInit(): void {
    console.log('this.numbers :>> ', this.numbers);
    console.log('a');
  }

  async close() {
    await this._modalCtrl.dismiss();
  }
}
