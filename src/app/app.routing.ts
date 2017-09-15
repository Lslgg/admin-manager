import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full', },
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  { path: 'admin',loadChildren: './admin/admin.module#AdminModule' },
  { path: 'home', loadChildren: './home/home.module#HomeModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
