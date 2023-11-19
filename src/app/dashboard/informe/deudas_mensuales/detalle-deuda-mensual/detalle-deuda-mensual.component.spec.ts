import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleDeudaMensualComponent } from './detalle-deuda-mensual.component';

describe('DetalleDeudaMensualComponent', () => {
  let component: DetalleDeudaMensualComponent;
  let fixture: ComponentFixture<DetalleDeudaMensualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleDeudaMensualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleDeudaMensualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
