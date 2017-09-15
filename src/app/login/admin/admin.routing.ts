import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

export const AdminRoutes: Routes = [
   { path: '', component: AdminComponent, data: { title: '登录'} },
   { path: 'login', component: AdminComponent, data: { title: '登录'} }
];

//一定要将路由加载的模块导出到主模块
export const AdminComponentList = [AdminComponent];