import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NGG_PERMISSION_STRATEGY } from '../../projects/permission/src/lib/permission-strategy';
import { NggPermissionModule } from '../../projects/permission/src/lib/permission.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoggedInPageComponent } from './logged-in-page/logged-in-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginService } from './login.service';
import { PermissionStrategy } from './permission-strategy';

@NgModule({
  declarations: [
    AppComponent,
    LoggedInPageComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NggPermissionModule.forRoot()
  ],
  providers: [
    { provide: NGG_PERMISSION_STRATEGY, useClass: PermissionStrategy, deps: [LoginService] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
