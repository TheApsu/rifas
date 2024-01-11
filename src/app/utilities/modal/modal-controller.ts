import { Type, ViewContainerRef } from '@angular/core';
import { AxisController } from '../axis-controller';
import { ModalControllerProvider } from './modal-controller-provider';

export class ModalController
  extends AxisController
  implements ModalControllerProvider
{
  public modal: HTMLDivElement | undefined;

  constructor(viewContainerRef: ViewContainerRef) {
    super(viewContainerRef);
  }

  async create(
    componentType: Type<unknown>,
    ev?: MouseEvent,
    componentProps?: any,
    backdropDismiss: boolean = true,
    cssClass?: string,
  ) {
    await this.dismiss();
    const dismiss = () => {
      this.modal = undefined;
    };
    const element = await super.setAxis(
      componentType,
      'modal',
      dismiss,
      ev,
      componentProps,
      backdropDismiss,
      cssClass,
    );
    this.modal = element;
  }

  async dismiss(): Promise<any> {
    if (this.modal) {
      const data = await super.dismissModal(this.modal);
      this.modal = undefined;
      return data;
    }
  }
}
