import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NGG_PERMISSION_STRATEGY } from '../../projects/permission/src/lib/permission-strategy';
import { NggPermissionModule } from '../../projects/permission/src/lib/permission.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PermissionStrategy } from './permission-strategy';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NggPermissionModule.forRoot()
  ],
  providers: [
    { provide: NGG_PERMISSION_STRATEGY, useClass: PermissionStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
