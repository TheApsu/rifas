import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RifaCardAdminComponent } from './rifa-card-admin.component';

describe('RifaCardAdminComponent', () => {
  let component: RifaCardAdminComponent;
  let fixture: ComponentFixture<RifaCardAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RifaCardAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RifaCardAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
