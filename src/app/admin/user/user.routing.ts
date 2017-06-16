import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { UserComponent,AddUserComponent } from './index';

export const UserRoutes: Routes = [
   { path: 'user', component: UserComponent, data: { title: '用户管理', module: 'user', power: "SHOW" } },
   { path: 'addUser', component: AddUserComponent, data: { title: '添加用户', module: 'user', power: "ADD" } },
   { path: 'addUser/:id', component: AddUserComponent, data: { title: '修改用户', module: 'user', power: "UPDATE" } },
];

//一定要将路由加载的模块导出到主模块
export const UserComponentList = [
    UserComponent,
    AddUserComponent
];

