import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RifaPageComponent } from './rifa-page.component';

describe('RifaPageComponent', () => {
  let component: RifaPageComponent;
  let fixture: ComponentFixture<RifaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RifaPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RifaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
