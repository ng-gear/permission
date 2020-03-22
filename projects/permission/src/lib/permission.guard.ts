import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment
} from '@angular/router';

import { NggPermissionService } from './permission.service';

export interface NggPermissionGuardConfig {
  has?: string | string[];
  except: string | string[];
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

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return !!next.routeConfig && this.hasPermissionToNavigate(next.routeConfig);
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return !!next.routeConfig && this.hasPermissionToNavigate(next.routeConfig);
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return this.hasPermissionToNavigate(route);
  }

  private hasPermissionToNavigate(route: Route): boolean {
    const config = getPermissionConfig(route);
    const has = config.has && this.permissionService.hasPermission(config.has);
    const except = config.except && this.permissionService.hasPermission(config.except);
    const canNavigate = !!has && !except;

    const redirectTo = Array.isArray(config.redirectTo) ? config.redirectTo : [config.redirectTo];

    if (canNavigate && config.redirectTo) {
      this.router.navigate(redirectTo);
    }

    return canNavigate;
  }
}
