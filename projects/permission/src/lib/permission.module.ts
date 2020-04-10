import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';

import { NggHasPermissionExceptDirective } from './has-permission-except.directive';
import { NggHasPermissionDirective } from './has-permission.directive';
import { NggHasPermissionPipe } from './has-permission.pipe';
import { NggPermissionGuard } from './permission.guard';
import { NggPermissionService } from './permission.service';

@NgModule({
  declarations: [
    NggHasPermissionDirective,
    NggHasPermissionExceptDirective,
    NggHasPermissionPipe
  ],
  exports: [
    NggHasPermissionDirective,
    NggHasPermissionExceptDirective,
    NggHasPermissionPipe
  ]
})
export class NggPermissionModule {
  static forRoot(): ModuleWithProviders<NggPermissionModule> {
    return {
      ngModule: NggPermissionModule,
      providers: [
        NggPermissionService,
        NggPermissionGuard,
        {
          provide: APP_INITIALIZER,
          useFactory(permissionService: NggPermissionService) {
            return () => permissionService.initializePermissions();
          },
          deps: [NggPermissionService],
          multi: true
        }
      ]
    };
  }

  static forChild(): ModuleWithProviders<NggPermissionModule> {
    return {
      ngModule: NggPermissionModule
    };
  }
}
