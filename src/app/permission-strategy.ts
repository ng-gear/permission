import { Observable } from 'rxjs';
import { map, skip, take } from 'rxjs/operators';

import { NggPermissionStrategy } from '../../projects/permission/src/lib/permission-strategy';
import { NggPermissionService } from '../../projects/permission/src/lib/permission.service';
import { LoginService } from './login.service';

export class PermissionStrategy implements NggPermissionStrategy {
  private readonly loginService: LoginService;
  private permissionService: NggPermissionService;

  constructor(loginService: LoginService) {
    this.loginService = loginService;

    this.handleLoggedInChange();
  }

  attach(permissionService: NggPermissionService): void {
    this.permissionService = permissionService;
  }

  getInitialPermissions(): Promise<string[]> | Observable<string[]> | string[] {
    return this.loginService.loggedInChange.pipe(
      take(1),
      map((user) => user?.permissions)
    );
  }

  handleLoggedInChange(): void {
    this.loginService.loggedInChange.pipe(
      skip(1),
      map((user) => user?.permissions)
    ).subscribe(
      (permissions) => this.permissionService.updatePermissions(permissions)
    );
  }
}
