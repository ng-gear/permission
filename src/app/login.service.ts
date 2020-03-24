import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { delay, subscribeOn } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly loginSubject = new BehaviorSubject<any | null>(null);

  readonly loggedInChange = this.loginSubject.pipe(
    delay(300)
  );

  loginUser1(): void {
    this.loginSubject.next({
      permissions: [
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
      ]
    });
  }

  loginUser2(): void {
    this.loginSubject.next({
      permissions: [
        'view.learn-angular',
        'view.generate-component',
        'view.add-angular-material',
        'view.add-dependency',
        'view.build-prod',
        'view.angury'
      ]
    });
  }

  logout(): void {
    this.loginSubject.next(null);
  }
}
