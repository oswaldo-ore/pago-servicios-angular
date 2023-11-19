import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeudasMensualesComponent } from './deudas-mensuales.component';

describe('DeudasMensualesComponent', () => {
  let component: DeudasMensualesComponent;
  let fixture: ComponentFixture<DeudasMensualesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeudasMensualesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeudasMensualesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
