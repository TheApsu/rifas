import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewImagesComponent } from './components/preview-images/preview-images.component';
import { ProductInformationComponent } from './components/product-information/product-information.component';
import { ProductCommentsComponent } from './components/product-comments/product-comments.component';
import { RecentlySectionComponent } from '../home/home-components/recently-section/recently-section.component';
import { HttpService } from '../../services/http.service';
import { IRifa } from '../../interfaces/rifa_interface';
import { IComment } from '../../interfaces/comment_interface';

@Component({
  selector: 'app-rifa-page',
  standalone: true,
  imports: [
    CommonModule,
    PreviewImagesComponent,
    ProductInformationComponent,
    ProductCommentsComponent,
    RecentlySectionComponent,
  ],
  templateUrl: './rifa-page.component.html',
  styleUrl: './rifa-page.component.scss',
})
export class RifaPageComponent implements OnInit {
  @Input() id!: string;
  private _httpSv = inject(HttpService);
  public rifa?: IRifa;
  public comments: IComment[] = [];

  constructor() {}

  async ngOnInit() {
    try {
      const rifaData = await this._httpSv.get('api/rifa/show', {
        id: this.id,
      });
      this.rifa = rifaData.rifa;
      this.comments = rifaData.comments;
      console.log('this.rifa :>> ', this.rifa);
    } catch (err) {
      console.error(err);
    }
  }
}
