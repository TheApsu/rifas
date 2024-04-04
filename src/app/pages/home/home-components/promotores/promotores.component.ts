import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { SwiperModule } from 'swiper/angular';
import SwiperCore, { Navigation, SwiperOptions } from 'swiper';
import { PromotoresCardComponent } from '../promotores-card/promotores-card.component';
import { breakpointsTypes } from '../../../../constants/breakpoints-type';
import { HttpService } from '../../../../services/http.service';
import { User } from '../../../../interfaces/user_interface';

SwiperCore.use([Navigation]);

@Component({
  selector: 'app-promotores',
  standalone: true,
  imports: [CommonModule, SwiperModule, PromotoresCardComponent],
  templateUrl: './promotores.component.html',
  styleUrl: './promotores.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PromotoresComponent implements OnInit {
  public swiperOptions: SwiperOptions = {
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
  public promotors: User[] = [];
  private _vHttpSv = inject(HttpService);

  async ngOnInit() {
    const vRes = await this._vHttpSv.get('api/user/getPromotors');
    this.promotors = vRes.users;
  }
}
