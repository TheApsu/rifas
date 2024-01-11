import { Type } from '@angular/core';

export abstract class PopoverControllerProvider {
  public popover?: Node;

  abstract create(componentType: Type<unknown>, ev: MouseEvent): any;

  abstract dismiss(): Promise<any>;
}
