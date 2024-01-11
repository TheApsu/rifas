import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchbarInputComponent } from './searchbar-input.component';

describe('SearchbarInputComponent', () => {
  let component: SearchbarInputComponent;
  let fixture: ComponentFixture<SearchbarInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchbarInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchbarInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
