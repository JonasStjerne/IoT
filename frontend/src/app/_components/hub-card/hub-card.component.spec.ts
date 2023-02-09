import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubCardComponent } from './hub-card.component';

describe('HubCardComponent', () => {
  let component: HubCardComponent;
  let fixture: ComponentFixture<HubCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HubCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HubCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
