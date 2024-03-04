import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPrePaymentComponent } from './modal-pre-payment.component';

describe('ModalPrePaymentComponent', () => {
  let component: ModalPrePaymentComponent;
  let fixture: ComponentFixture<ModalPrePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPrePaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPrePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
