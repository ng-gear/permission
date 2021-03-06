import { Directive, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';

import { NggPermissionService } from './permission.service';

@Directive({
  selector: '[nggHasPermission]'
})
export class NggHasPermissionDirective implements OnChanges {
  private readonly permissionService: NggPermissionService;
  private readonly viewContainerRef: ViewContainerRef;
  private readonly templateRef: TemplateRef<void>;
  private hasPermission = false;

  @Input('nggHasPermission') permission: string | string[];
  @Input('nggHasPermissionElse') elseTemplate: TemplateRef<unknown> | null = null;

  constructor(permissionService: NggPermissionService, viewContainerRef: ViewContainerRef, templateRef: TemplateRef<void>) {
    this.permissionService = permissionService;
    this.viewContainerRef = viewContainerRef;
    this.templateRef = templateRef;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.permission) {
      return;
    }

    this.hasPermission = this.permissionService.hasPermission(this.permission);

    this.viewContainerRef.clear();
    if (this.hasPermission) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else if (this.elseTemplate) {
      this.viewContainerRef.createEmbeddedView(this.elseTemplate);
    }
  }
}
