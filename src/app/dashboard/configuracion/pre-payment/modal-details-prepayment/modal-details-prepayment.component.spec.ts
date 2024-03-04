import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetailsPrepaymentComponent } from './modal-details-prepayment.component';

describe('ModalDetailsPrepaymentComponent', () => {
  let component: ModalDetailsPrepaymentComponent;
  let fixture: ComponentFixture<ModalDetailsPrepaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDetailsPrepaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDetailsPrepaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
