import { TestBed } from '@angular/core/testing';

import { SuperAdminGuardGuard } from './super-admin-guard.guard';

describe('SuperAdminGuardGuard', () => {
  let guard: SuperAdminGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SuperAdminGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
