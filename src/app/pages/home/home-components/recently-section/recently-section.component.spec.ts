import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlySectionComponent } from './recently-section.component';

describe('RecentlySectionComponent', () => {
  let component: RecentlySectionComponent;
  let fixture: ComponentFixture<RecentlySectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentlySectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecentlySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
