import { Component } from '@angular/core';

import { LoginService } from '../login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  private readonly loginService: LoginService;

  constructor(loginService: LoginService) {
    this.loginService = loginService;
  }

  loginUser1(): void {
    this.loginService.loginUser1();
  }

  loginUser2(): void {
    this.loginService.loginUser2();
  }
}
