import {
  Component,
  Input,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProductComponent } from '../card-product/card-product.component';

import { SwiperModule } from 'swiper/angular';
import { breakpointsTypes } from '../../../../constants/breakpoints-type';

import SwiperCore, { Navigation, SwiperOptions } from 'swiper';
import { IRifa } from '../../../../interfaces/rifa_interface';
import { HttpService } from '../../../../services/http.service';

SwiperCore.use([Navigation]);

@Component({
  selector: 'app-recently-section',
  standalone: true,
  imports: [CommonModule, CardProductComponent, SwiperModule],
  templateUrl: './recently-section.component.html',
  styleUrl: './recently-section.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RecentlySectionComponent implements OnInit {
  @Input() route: string = '';
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
  public rifas: IRifa[] = [];
  private _httpSv = inject(HttpService);

  async ngOnInit() {
    const res = await this._httpSv.get(`api/rifa/${this.route}`);
    this.rifas = res;
    console.log('res :>> ', res);
  }
}
