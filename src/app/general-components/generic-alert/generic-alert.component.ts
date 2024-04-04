import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverControllerService } from '../../utilities/popover/popover-controller-service';

@Component({
  selector: 'app-generic-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generic-alert.component.html',
  styleUrl: './generic-alert.component.scss',
})
export class GenericAlertComponent {
  @Input() header?: string;
  @Input() message?: string;
  private _popoverCtrl = inject(PopoverControllerService);

  constructor() {}

  close() {
    this._popoverCtrl.dismiss();
  }
}
