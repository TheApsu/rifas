import { Type, ViewContainerRef } from '@angular/core';
import { PopoverControllerProvider } from './poporver-controller-provider';
import { AxisController } from '../axis-controller';

export class PopoverController
  extends AxisController
  implements PopoverControllerProvider
{
  public popover: HTMLDivElement | undefined;

  constructor(viewContainerRef: ViewContainerRef) {
    super(viewContainerRef);
  }

  async create(
    componentType: Type<unknown>,
    ev?: MouseEvent,
    componentProps?: any
  ) {
    await this.dismiss();
    const dismiss = () => {
      this.popover = undefined;
    };

    const element = await super.setAxis(
      componentType,
      'popover',
      dismiss,
      ev,
      componentProps
    );

    this.popover = element;
  }

  async dismiss(): Promise<any> {
    if (this.popover) {
      const data = await super.dismissModal(this.popover);
      this.popover = undefined;
      return data;
    }
  }
}
