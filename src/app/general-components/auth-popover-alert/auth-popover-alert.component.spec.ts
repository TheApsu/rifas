import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPopoverAlertComponent } from './auth-popover-alert.component';

describe('AuthPopoverAlertComponent', () => {
  let component: AuthPopoverAlertComponent;
  let fixture: ComponentFixture<AuthPopoverAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPopoverAlertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthPopoverAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
