import { Component } from '@angular/core';

import { LoginService } from '../login.service';

@Component({
  selector: 'app-logged-in-page',
  templateUrl: './logged-in-page.component.html',
  styleUrls: ['./logged-in-page.component.scss']
})
export class LoggedInPageComponent {
  private readonly loginService: LoginService;

  readonly title = 'permission-test';

  constructor(loginService: LoginService) {
    this.loginService = loginService;
  }

  logout(): void {
    this.loginService.logout();
  }
}
