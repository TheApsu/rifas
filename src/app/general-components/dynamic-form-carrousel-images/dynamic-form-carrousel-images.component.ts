import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicForm } from '../../interfaces/dynamic_form';
import SwiperCore, { Navigation, SwiperOptions } from 'swiper';
import { SwiperModule } from 'swiper/angular';
import { DragAndDropDirective } from '../../directives/drag-and-drop.directive';
import { FilesService } from '../../services/files.service';
import { environment } from '../../../environments/environment';

SwiperCore.use([Navigation]);

@Component({
  selector: 'app-dynamic-form-carrousel-images',
  standalone: true,
  imports: [CommonModule, SwiperModule, DragAndDropDirective],
  templateUrl: './dynamic-form-carrousel-images.component.html',
  styleUrl: './dynamic-form-carrousel-images.component.scss',
})
export class DynamicFormCarrouselImagesComponent {
  @Input() field!: DynamicForm;
  @Input() uri?: string;
  public url = environment.uploads;
  public uploadedImages: string[] = [];
  public auxUploadedImages: string[] = [];
  public swiperOptions: SwiperOptions = {
    navigation: true,
    centeredSlides: true,
    centeredSlidesBounds: true,
  };

  constructor(private _fileSv: FilesService) {}

  setImages(ev: string[]) {
    this.uploadedImages.push(...ev);
    this.auxUploadedImages.push(...ev);
  }

  async upload(ev: Event) {
    const event = ev.target as HTMLInputElement;
    const results = await this._fileSv.uploadImagesFromInput(ev);
    event.value = '';
    this.setImages(results);
  }
}
