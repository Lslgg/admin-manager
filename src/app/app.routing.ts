import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './admin/common/server/auth-guard.service';

// Layouts
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './admin/login/login.component';


export const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full',
  },
  {
    path: 'login', component: LoginComponent, data: { title: '登录' }
  },
  {
    path: '', component: AdminComponent, data: { title: '后台管理' },
    children: [
      {
        path: 'admin', canActivateChild: [AuthGuard],
        loadChildren: './admin/admin.module#AdminModule'
      },
    ]
  },
  {
    path: '', component: HomeComponent, data: { title: '首页' },
    children: [
      {
        path: 'home',
        loadChildren: './home/home.module#HomeModule'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
