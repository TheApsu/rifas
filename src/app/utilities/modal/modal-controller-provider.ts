import { Type } from '@angular/core';

export abstract class ModalControllerProvider {
  public modal?: Node;

  abstract create(componentType: Type<unknown>, ev: MouseEvent): any;

  abstract dismiss(): Promise<any>;
}
