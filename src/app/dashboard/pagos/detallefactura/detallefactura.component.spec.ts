import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallefacturaComponent } from './detallefactura.component';

describe('DetallefacturaComponent', () => {
  let component: DetallefacturaComponent;
  let fixture: ComponentFixture<DetallefacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallefacturaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallefacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
