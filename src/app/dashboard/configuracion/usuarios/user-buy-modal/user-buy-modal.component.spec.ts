import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBuyModalComponent } from './user-buy-modal.component';

describe('UserBuyModalComponent', () => {
  let component: UserBuyModalComponent;
  let fixture: ComponentFixture<UserBuyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBuyModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserBuyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
