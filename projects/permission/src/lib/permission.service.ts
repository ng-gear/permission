import { Inject, Injectable } from '@angular/core';

import { fromAsyncResponse } from '../helpers';
import { NggPermissionStrategy, NGG_PERMISSION_STRATEGY } from './permission-strategy';

@Injectable()
export class NggPermissionService {
  private readonly permissionStrategy: NggPermissionStrategy;
  private permissions: string[];

  constructor(@Inject(NGG_PERMISSION_STRATEGY) permissionStrategy: NggPermissionStrategy) {
    this.permissionStrategy = permissionStrategy;

    permissionStrategy.attach(this);
  }

  hasPermission(permission: string | string[]): boolean {
    const permissions = Array.isArray(permission) ? permission : [permission];
    return permissions.some((p) => this.permissions.includes(p));
  }

  initializePermissions(): Promise<unknown> {
    return fromAsyncResponse(this.permissionStrategy.getInitialPermissions())
      .toPromise()
      .then((permissions) => this.permissions = permissions ?? []);
  }

  updatePermissions(permissions: string[] | null) {
    this.permissions = permissions ?? [];
  }
}
