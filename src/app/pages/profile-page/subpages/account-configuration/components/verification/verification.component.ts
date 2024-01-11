import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalControllerService } from '../../../../../../utilities/modal/modal-controller-service';

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class VerificationComponent {
  constructor(private _modalCtrL: ModalControllerService) {}

  async close() {
    await this._modalCtrL.dismiss();
  }
}
