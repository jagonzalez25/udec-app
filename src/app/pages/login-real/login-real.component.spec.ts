import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRealComponent } from './login-real.component';

describe('LoginRealComponent', () => {
  let component: LoginRealComponent;
  let fixture: ComponentFixture<LoginRealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginRealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
