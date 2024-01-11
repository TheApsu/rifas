import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverControllerService } from '../../utilities/popover/popover-controller-service';

@Component({
  selector: 'app-auth-popover-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth-popover-alert.component.html',
  styleUrl: './auth-popover-alert.component.scss',
})
export class AuthPopoverAlertComponent {
  @Input() alertTitle!: string;
  @Input() error!: string;

  constructor(private _popoverCtrlSv: PopoverControllerService) {}

  async accept() {
    await this._popoverCtrlSv.dismiss();
  }
}
