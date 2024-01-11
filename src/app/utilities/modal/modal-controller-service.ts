import { Type, Injectable, ViewContainerRef, Component } from '@angular/core';

import { ModalControllerProvider } from './modal-controller-provider';
import { ModalController } from './modal-controller';

@Injectable({
  providedIn: 'root',
})
@Component({
  template: '',
  selector: 'modal-controller',
  standalone: true,
})
export class ModalControllerService implements ModalControllerProvider {
  private _provider!: ModalController;

  constructor(private viewContainerRef: ViewContainerRef) {
    this.initialize();
  }

  async create(
    componentType: Type<unknown>,
    ev?: MouseEvent,
    componentProps?: Object,
    backdropDismiss: boolean = true,
    cssClass?: string,
  ) {
    await this._provider.create(
      componentType,
      ev,
      componentProps,
      backdropDismiss,
      cssClass,
    );
  }

  initialize() {
    if (!this._provider) {
      this._provider = new ModalController(this.viewContainerRef);
    }
  }

  async dismiss(): Promise<any> {
    return this._provider.dismiss();
  }
}
