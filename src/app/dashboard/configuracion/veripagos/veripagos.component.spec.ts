import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeripagosComponent } from './veripagos.component';

describe('VeripagosComponent', () => {
  let component: VeripagosComponent;
  let fixture: ComponentFixture<VeripagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VeripagosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeripagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
