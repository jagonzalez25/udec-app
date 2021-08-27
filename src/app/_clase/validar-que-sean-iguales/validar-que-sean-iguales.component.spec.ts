import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarQueSeanIgualesComponent } from './validar-que-sean-iguales.component';

describe('ValidarQueSeanIgualesComponent', () => {
  let component: ValidarQueSeanIgualesComponent;
  let fixture: ComponentFixture<ValidarQueSeanIgualesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidarQueSeanIgualesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarQueSeanIgualesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
