import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../general-components/header/header.component';
import { RecentlySectionComponent } from './home-components/recently-section/recently-section.component';
import { PromotoresComponent } from './home-components/promotores/promotores.component';
import { BannerComponent } from './home-components/banner/banner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    RecentlySectionComponent,
    PromotoresComponent,
    BannerComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
