import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupMovilesComponent } from './grup-moviles.component';

describe('GrupMovilesComponent', () => {
  let component: GrupMovilesComponent;
  let fixture: ComponentFixture<GrupMovilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrupMovilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupMovilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
