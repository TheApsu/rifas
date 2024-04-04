import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayingRifasComponent } from './playing-rifas.component';

describe('PlayingRifasComponent', () => {
  let component: PlayingRifasComponent;
  let fixture: ComponentFixture<PlayingRifasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayingRifasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayingRifasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
