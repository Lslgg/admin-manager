import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './admin/common/server/auth-guard.service';

// Layouts
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './admin/login/login.component';


export const routes: Routes = [
  {
    path: '', redirectTo: 'admin', pathMatch: 'full',
  },
  {
    path: '', component: AdminComponent, data: { title: '首页' },
    children: [
      {
        path: 'admin', canActivateChild: [AuthGuard],
        loadChildren: './admin/admin.module#AdminModule'
      },
    ]
  },
  {
    path: 'login', component: LoginComponent, data: { title: 'login' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
