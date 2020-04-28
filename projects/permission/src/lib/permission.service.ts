import { Inject, Injectable } from '@angular/core';

import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { fromAsyncResponse } from '../helpers';
import { NggPermissionStrategy, NGG_PERMISSION_STRATEGY } from './permission-strategy';

@Injectable()
export class NggPermissionService {
  private readonly permissionStrategy: NggPermissionStrategy;
  private readonly permissionsSubject = new ReplaySubject<string[]>(1);
  private permissions: string[];

  constructor(@Inject(NGG_PERMISSION_STRATEGY) permissionStrategy: NggPermissionStrategy) {
    this.permissionStrategy = permissionStrategy;

    permissionStrategy.attach(this);
  }

  hasPermission(permission: string | string[]): boolean {
    const permissionsToCheck = Array.isArray(permission) ? permission : [permission];
    return permissionsToCheck.some((p) => this.permissions.includes(p));
  }

  hasPermissionAsync(permission: string | string[]): Observable<boolean> {
    const permissions = Array.isArray(permission) ? permission : [permission];
    return this.permissionsSubject.pipe(
      map((activePermissions) => permissions.some((p) => activePermissions.includes(p)))
    );
  }

  async initializePermissions(): Promise<void> {
    const permissions = await fromAsyncResponse(this.permissionStrategy.getInitialPermissions()).toPromise();
    this.permissions = permissions ?? [];
    this.permissionsSubject.next(this.permissions);
  }

  updatePermissions(permissions: string[] | null) {
    this.permissions = permissions ?? [];
    this.permissionsSubject.next(this.permissions);
  }
}
