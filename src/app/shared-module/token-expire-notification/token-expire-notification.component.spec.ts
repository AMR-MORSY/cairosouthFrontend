import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenExpireNotificationComponent } from './token-expire-notification.component';

describe('TokenExpireNotificationComponent', () => {
  let component: TokenExpireNotificationComponent;
  let fixture: ComponentFixture<TokenExpireNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenExpireNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenExpireNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
