import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewImagesComponent } from './components/preview-images/preview-images.component';
import { ProductInformationComponent } from './components/product-information/product-information.component';
import { ProductCommentsComponent } from './components/product-comments/product-comments.component';
import { RecentlySectionComponent } from '../home/home-components/recently-section/recently-section.component';

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

  ngOnInit(): void {
    console.log('this.id :>> ', this.id);
  }
}
