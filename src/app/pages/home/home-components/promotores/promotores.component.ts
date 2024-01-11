import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SwiperModule } from 'swiper/angular';
import SwiperCore, { Navigation, SwiperOptions } from 'swiper';
import { PromotoresCardComponent } from '../promotores-card/promotores-card.component';
import { breakpointsTypes } from '../../../../constants/breakpoints-type';

SwiperCore.use([Navigation]);

@Component({
  selector: 'app-promotores',
  standalone: true,
  imports: [CommonModule, SwiperModule, PromotoresCardComponent],
  templateUrl: './promotores.component.html',
  styleUrl: './promotores.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PromotoresComponent {
  swiperOptions: SwiperOptions = {
    slidesPerView: 1.1,
    spaceBetween: 0,
    navigation: true,
    breakpoints: {
      [breakpointsTypes.sm]: {
        slidesPerView: 2.1,
      },
      [breakpointsTypes.md]: {
        slidesPerView: 3,
      },
      [breakpointsTypes.lg]: {
        slidesPerView: 4,
      },
    },
  };
}
