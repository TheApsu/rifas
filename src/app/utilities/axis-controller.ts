import { ComponentRef, Type, ViewContainerRef } from '@angular/core';

export class AxisController {
  private _componentReference?: ComponentRef<any>;
  constructor(private viewContainerRef: ViewContainerRef) {}

  async setAxis(
    componentType: Type<unknown>,
    className: string,
    callback: Function,
    ev?: MouseEvent,
    componentProps?: any,
    backdropDismiss: boolean = true,
    cssClass?: string,
  ) {
    try {
      const component = this.viewContainerRef.createComponent(componentType);
      this._componentReference = component;
      if (componentProps) {
        for (const key in componentProps) {
          const element = componentProps[key];
          component.setInput(key, element);
        }
      }

      const nativeElement: HTMLElement = component.location.nativeElement;
      const genericElementParent = document.createElement('div');
      const genericElementContent = document.createElement('div');
      genericElementParent.classList.add('generic-overlay-element');
      genericElementContent.appendChild(nativeElement);

      let top = undefined;
      let left = undefined;

      genericElementContent.classList.add('generic-overlay-element-content');
      genericElementContent.classList.add(className);
      if (cssClass) {
        genericElementContent.classList.add(cssClass);
      }
      genericElementParent.appendChild(genericElementContent);

      genericElementParent.dataset['parent'] = 'true';

      if (backdropDismiss) {
        genericElementParent.onclick = async (ev) => {
          const event: any = ev.target;
          if (event.dataset.parent) {
            await this.dismissModal(genericElementParent);
            callback();
          }
        };
      }

      document.body.classList.add('disable-scroll');
      document.body.appendChild(genericElementParent);

      setTimeout(() => {
        if (ev) {
          top = `${ev.y}px`;
          left = `${ev.x}px`;
        } else {
          console.dir(genericElementContent);
          left = `${
            window.innerWidth / 2 - genericElementContent.offsetWidth / 2
          }px`;
          top = `${
            window.innerHeight / 2 - genericElementContent.offsetHeight / 2
          }px`;
        }
        genericElementContent.style.top = top;
        genericElementContent.style.left = left;
        const documentWidth = document.body.clientWidth;
        if (ev && ev.x + genericElementContent.clientWidth > documentWidth) {
          genericElementContent.style.left = `${
            documentWidth - genericElementContent.clientWidth - 20
          }px`;
        }
      });

      return genericElementParent;
    } catch (err) {
      console.error(err);
      return undefined;
    }
  }

  async dismissModal(element: HTMLDivElement | undefined) {
    return new Promise((resolve) => {
      console.log(element);
      if (element) {
        element.classList.add('fadeout');
        setTimeout(() => {
          try {
            if (!this._componentReference) {
              return;
            }
            this._componentReference?.destroy();
            this._componentReference = undefined;
            document.body.removeChild(element as HTMLDivElement);
            document.body.classList.remove('disable-scroll');
            element = undefined;
          } catch (err) {
            console.log('Err');
          }
          resolve(true);
        }, 300);
      } else {
        resolve(true);
      }
    });
  }
}
