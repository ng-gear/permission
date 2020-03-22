import { timer, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NggPermissionStrategy } from '../../projects/permission/src/lib/permission-strategy';

export class PermissionStrategy implements NggPermissionStrategy {
  getPermissions(): Promise<string[]> | Observable<string[]> | string[] {
    return timer(700).pipe(
      map(() => [
        'view.learn-angular',
        'view.cli-docs',
        'view.angular-blog',
        'view.generate-component',
        'view.add-angular-material',
        'view.add-pwa',
        'view.add-dependency',
        'view.run-and-watch-tests',
        'view.build-prod',
        'view.angular-animations',
        'view.cli-angular-com',
        'view.angury',
        'view.angular-e2e',
        'view.find-a-local-meet',
        'view.gitter',
        'view.angular-repo'
      ])
    );
  }
}
