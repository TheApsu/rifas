import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalControllerService } from '../../../../utilities/modal/modal-controller-service';
import { Numbers } from '../../../../interfaces/rifa_interface';
import { FilterClickedNumbersPipe } from './pipes/filter-clicked-numbers.pipe';

@Component({
  selector: 'app-pending-numbers',
  standalone: true,
  imports: [CommonModule, FilterClickedNumbersPipe],
  templateUrl: './pending-numbers.component.html',
  styleUrl: './pending-numbers.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PendingNumbersComponent implements OnInit {
  @Input() numbers: Numbers[] = [];
  @Input() price: number = 0;

  constructor(private _modalCtrl: ModalControllerService) {}

  ngOnInit(): void {}

  async close() {
    await this._modalCtrl.dismiss();
  }

  addNumber(item: Numbers, index: number) {
    this.numbers[index].clicked = !this.numbers[index].clicked;
  }

  buyNumbers() {}
}
