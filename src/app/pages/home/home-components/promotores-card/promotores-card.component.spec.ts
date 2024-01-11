import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotoresCardComponent } from './promotores-card.component';

describe('PromotoresCardComponent', () => {
  let component: PromotoresCardComponent;
  let fixture: ComponentFixture<PromotoresCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromotoresCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromotoresCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
