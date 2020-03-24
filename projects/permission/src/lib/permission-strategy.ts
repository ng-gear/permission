import { InjectionToken } from '@angular/core';

import { Observable } from 'rxjs';

import { NggPermissionService } from './permission.service';

export const NGG_PERMISSION_STRATEGY = new InjectionToken<NggPermissionStrategy>('NGG_PERMISSION_STRATEGY');

export type AsyncResponse<T> = T | Promise<T> | Observable<T>;

export interface NggPermissionStrategy {
  attach(permissionService: NggPermissionService): void;

  getInitialPermissions(): AsyncResponse<string[] | null>;
}
