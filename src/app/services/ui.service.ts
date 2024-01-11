import { Injectable, Type } from '@angular/core';
import { PopoverControllerService } from '../utilities/popover/popover-controller-service';
import { ToastControllerService } from '../utilities/toast/toast-controller-service';
import { ModalControllerService } from '../utilities/modal/modal-controller-service';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  constructor(
    private _popoverCtrl: PopoverControllerService,
    private _toastCtrl: ToastControllerService,
    private _modalCtrl: ModalControllerService,
  ) {}

  async showPopover(
    component: Type<unknown>,
    ev?: MouseEvent,
    componentProps?: Object,
  ) {
    await this._popoverCtrl.create(component, ev, componentProps);
  }

  async showToast(msg: string) {
    this._toastCtrl.create(4000, msg);
  }

  async showModal(
    component: Type<unknown>,
    componentProps?: Object,
    cssClass?: string,
  ) {
    this._modalCtrl.create(component, undefined, undefined, true, cssClass);
  }
}
