import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterHubComponent } from './register-hub.component';

describe('RegisterHubComponent', () => {
  let component: RegisterHubComponent;
  let fixture: ComponentFixture<RegisterHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterHubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
