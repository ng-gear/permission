import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment
} from '@angular/router';

import { combineLatest, of, Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { NggPermissionService } from './permission.service';

export interface NggPermissionGuardConfig {
  has?: string | string[];
  except?: string | string[];
  redirectTo?: string | string[];
}

const getPermissionConfig = (route: Route): NggPermissionGuardConfig => {
  return route.data?.nggPermission ?? route.data?.permission;
};

@Injectable()
export class NggPermissionGuard implements CanActivate, CanActivateChild, CanLoad {
  private readonly permissionService: NggPermissionService;
  private readonly router: Router;

  constructor(permissionService: NggPermissionService, router: Router) {
    this.permissionService = permissionService;
    this.router = router;
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return !!next.routeConfig && this.hasPermissionToNavigate(next.routeConfig);
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return !!next.routeConfig && this.hasPermissionToNavigate(next.routeConfig);
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.hasPermissionToNavigate(route);
  }

  private hasPermissionToNavigate(route: Route): Observable<boolean> {
    const config = getPermissionConfig(route);
    const redirectTo = Array.isArray(config.redirectTo) ? config.redirectTo : [config.redirectTo];

    return combineLatest([
      config.has ? this.permissionService.hasPermissionAsync(config.has) : of(true),
      config.except ? this.permissionService.hasPermissionAsync(config.except) : of(false)
    ]).pipe(
      take(1),
      map(([has, except]) => has && !except),
      tap((canNavigate) => !canNavigate && config.redirectTo && this.router.navigate(redirectTo))
    );
  }
}
