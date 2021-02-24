import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioGrupoComponent } from './servicio-grupo.component';

describe('ServicioGrupoComponent', () => {
  let component: ServicioGrupoComponent;
  let fixture: ComponentFixture<ServicioGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicioGrupoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicioGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
