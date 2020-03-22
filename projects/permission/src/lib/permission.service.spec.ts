import { TestBed } from '@angular/core/testing';

import { NggPermissionService } from './permission.service';

xdescribe('NggPermissionService', () => {
  let service: NggPermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NggPermissionService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
