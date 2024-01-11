import { ToastControllerProvider } from './toast-controller-provider';

export class ToastController implements ToastControllerProvider {
  public timer: number;
  public text: string;

  private _htmlToastElement?: HTMLElement;

  constructor(timer: number, text: string) {
    this.timer = timer;
    this.text = text;
  }

  create(): void {
    this._htmlToastElement = document.createElement('DIV');
    this._htmlToastElement.classList.add('overlay-toast');
    const textWrapper = document.createElement('P');
    textWrapper.innerHTML = this.text;
    this._htmlToastElement.appendChild(textWrapper);
    document.body.appendChild(this._htmlToastElement);
    this._htmlToastElement.classList.toggle('show');
    setTimeout(() => {
      if (this._htmlToastElement) {
        this._htmlToastElement.classList.toggle('show');
        setTimeout(() => {
          if (this._htmlToastElement) {
            document.body.removeChild(this._htmlToastElement);
            this._htmlToastElement = undefined;
          }
        }, 300);
      }
    }, this.timer);
  }
}
