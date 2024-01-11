import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appSearchbarInput]',
  standalone: true,
})
export class SearchbarInputDirective {
  @Input() debounce?: number = 200;
  @Output() emitSearchValue = new EventEmitter();
  @HostListener('keydown', ['$event']) onChange(event: Event) {
    if (this._timeOut) {
      clearTimeout(this._timeOut);
      this._timeOut = undefined;
    }
    this._timeOut = setTimeout(() => {
      const value = this._el.nativeElement.value;
      this.emitSearchValue.emit(value);
    }, this.debounce);
  }

  private _timeOut: any;

  constructor(private _el: ElementRef<HTMLInputElement>) {}
}
