import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateDebtComponent } from './modal-create-debt.component';

describe('ModalCreateDebtComponent', () => {
  let component: ModalCreateDebtComponent;
  let fixture: ComponentFixture<ModalCreateDebtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCreateDebtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCreateDebtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
