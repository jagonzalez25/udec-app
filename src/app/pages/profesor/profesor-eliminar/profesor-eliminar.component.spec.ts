import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesorEliminarComponent } from './profesor-eliminar.component';

describe('ProfesorEliminarComponent', () => {
  let component: ProfesorEliminarComponent;
  let fixture: ComponentFixture<ProfesorEliminarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfesorEliminarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesorEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
