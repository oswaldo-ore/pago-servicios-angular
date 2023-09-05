import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallepagousuarioComponent } from './detallepagousuario.component';

describe('DetallepagousuarioComponent', () => {
  let component: DetallepagousuarioComponent;
  let fixture: ComponentFixture<DetallepagousuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallepagousuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallepagousuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
