import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrePaymentComponent } from './pre-payment.component';

describe('PrePaymentComponent', () => {
  let component: PrePaymentComponent;
  let fixture: ComponentFixture<PrePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrePaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
