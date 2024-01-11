import { Component, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProductComponent } from '../card-product/card-product.component';

import { SwiperModule } from 'swiper/angular';
import { breakpointsTypes } from '../../../../constants/breakpoints-type';

import SwiperCore, { Navigation, SwiperOptions } from 'swiper';

SwiperCore.use([Navigation]);

@Component({
  selector: 'app-recently-section',
  standalone: true,
  imports: [CommonModule, CardProductComponent, SwiperModule],
  templateUrl: './recently-section.component.html',
  styleUrl: './recently-section.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RecentlySectionComponent {
  @Input() title!: string;
  @Input() icon?: string;
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
