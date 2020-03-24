import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  private readonly loginService: LoginService;
  private readonly router: Router;

  constructor(loginService: LoginService, router: Router) {
    this.loginService = loginService;
    this.router = router;
  }

  ngOnInit(): void {
    this.loginService.loggedInChange.subscribe(
      (loggedIn) => this.router.navigate([loggedIn ? '/user' : '/'])
    );
  }
}
