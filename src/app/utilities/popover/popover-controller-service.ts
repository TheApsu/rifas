import { Type, Injectable, ViewContainerRef, Component } from '@angular/core';

import { PopoverControllerProvider } from './poporver-controller-provider';
import { PopoverController } from './popover-controller';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'popover-controller',
  template: '',
  standalone: true,
})
export class PopoverControllerService implements PopoverControllerProvider {
  private _provider!: PopoverController;

  constructor(private viewContainerRef: ViewContainerRef) {
    this.initialize();
  }

  async create(
    componentType: Type<unknown>,
    ev?: MouseEvent,
    componentProps?: Object
  ) {
    await this._provider.create(componentType, ev, componentProps);
  }

  initialize() {
    if (!this._provider) {
      this._provider = new PopoverController(this.viewContainerRef);
    }
  }

  async dismiss(): Promise<any> {
    return this._provider.dismiss();
  }
}
