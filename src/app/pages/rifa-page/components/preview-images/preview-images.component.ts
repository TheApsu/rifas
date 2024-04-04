import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IRifa } from '../../../../interfaces/rifa_interface';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-preview-images',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preview-images.component.html',
  styleUrl: './preview-images.component.scss',
})
export class PreviewImagesComponent implements OnInit {
  @Input() rifa?: IRifa;
  public vImageUrl = environment.uploads;
  public vSelectedImg = '';

  ngOnInit(): void {
    this.vSelectedImg = this.rifa!.images[0];
    console.log('this.vSelectedImg :>> ', this.vSelectedImg);
  }
}
