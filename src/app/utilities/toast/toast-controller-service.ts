import { Injectable } from '@angular/core';
import { ToastController } from './toast-controller';
import { ToastControllerProvider } from './toast-controller-provider';

@Injectable({
  providedIn: 'root',
})
export class ToastControllerService implements ToastControllerProvider {
  public timer: number;
  public text: string;

  private _toastController: ToastController;

  constructor() {
    this.timer = 0;
    this.text = '';
    this._toastController = new ToastController(this.timer, this.text);
  }

  create(timer: number, text: string): void {
    this._toastController = new ToastController(timer, text);
    this._toastController.create();
  }
}
