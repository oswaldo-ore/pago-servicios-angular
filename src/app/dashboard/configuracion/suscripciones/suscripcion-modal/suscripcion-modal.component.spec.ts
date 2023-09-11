import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuscripcionModalComponent } from './suscripcion-modal.component';

describe('SuscripcionModalComponent', () => {
  let component: SuscripcionModalComponent;
  let fixture: ComponentFixture<SuscripcionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuscripcionModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuscripcionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
