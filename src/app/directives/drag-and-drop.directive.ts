import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  Renderer2,
} from '@angular/core';
import { FilesService } from '../services/files.service';

@Directive({
  selector: '[appDragAndDrop]',
  standalone: true,
})
export class DragAndDropDirective {
  @Output() emitImages = new EventEmitter();
  @HostListener('dragover', ['$event']) allowDrop(ev: Event) {
    ev.preventDefault();
    this._el.nativeElement.style.borderColor = 'rgb(31 41 55)';
  }

  @HostListener('dragleave', ['$event']) leaveDrop(ev: Event) {
    ev.preventDefault();
    this._renderer2.removeStyle(this._el.nativeElement, 'borderColor');
  }

  @HostListener('drop', ['$event']) async drop(e: any) {
    e.preventDefault();
    const results = await this._filesSv.uploadImagesFromDragAndDrop(e);
    this.emitImages.emit(results);
    // var data = ev.dataTransfer.getData("text");
    // ev.target.appendChild(document.getElementById(data));
  }

  constructor(
    private _filesSv: FilesService,
    private _el: ElementRef<HTMLDivElement>,
    private _renderer2: Renderer2
  ) {}
}
