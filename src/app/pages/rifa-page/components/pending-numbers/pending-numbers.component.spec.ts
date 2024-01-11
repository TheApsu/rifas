import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingNumbersComponent } from './pending-numbers.component';

describe('PendingNumbersComponent', () => {
  let component: PendingNumbersComponent;
  let fixture: ComponentFixture<PendingNumbersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingNumbersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PendingNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
