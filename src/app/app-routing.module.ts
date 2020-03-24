import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoggedInPageComponent } from './logged-in-page/logged-in-page.component';
import { LoginPageComponent } from './login-page/login-page.component';


const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'user', component: LoggedInPageComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
