import { Pipe, PipeTransform } from '@angular/core';

import { NggPermissionService } from './permission.service';

@Pipe({
  name: 'nggHasPermission'
})
export class NggHasPermissionPipe implements PipeTransform {
  private readonly permissionService: NggPermissionService;

  constructor(permissionService: NggPermissionService) {
    this.permissionService = permissionService;
  }

  transform(value: string | string[]): boolean {
    return this.permissionService.hasPermission(value);
  }
}
