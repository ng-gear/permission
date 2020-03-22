import { TestBed } from '@angular/core/testing';

import { NggPermissionGuard } from './permission.guard';

describe('PermissionGuard', () => {
  let guard: NggPermissionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NggPermissionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
