import { Inject, Injectable } from '@angular/core';

import { fromAsyncResponse } from '../helpers';
import { NggPermissionStrategy, NGG_PERMISSION_STRATEGY } from './permission-strategy';

@Injectable()
export class NggPermissionService {
  private readonly permissionStrategy: NggPermissionStrategy;
  private permissions: string[];

  constructor(@Inject(NGG_PERMISSION_STRATEGY) permissionStrategy: NggPermissionStrategy) {
    this.permissionStrategy = permissionStrategy;
  }

  hasPermission(permission: string | string[]): boolean {
    const permissions = Array.isArray(permission) ? permission : [permission];
    return permissions.some((p) => this.permissions.includes(p));
  }

  initializePermissions(): Promise<unknown> {
    return fromAsyncResponse(this.permissionStrategy.getPermissions())
      .toPromise()
      .then((permissions) => this.permissions = permissions);
  }
}
