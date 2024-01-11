import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormCarrouselImagesComponent } from './dynamic-form-carrousel-images.component';

describe('DynamicFormCarrouselImagesComponent', () => {
  let component: DynamicFormCarrouselImagesComponent;
  let fixture: ComponentFixture<DynamicFormCarrouselImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicFormCarrouselImagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DynamicFormCarrouselImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
