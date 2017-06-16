import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RoleComponent, AddRoleComponent } from "./index";


export const RoleRoutes: Routes = [
    { path: 'role', component: RoleComponent, data: { title: '角色管理', module: 'role', power: "SHOW" } },
    { path: 'addRole', component: AddRoleComponent, data: { title: '添加角色', module: 'role', power: "ADD" } },
    { path: 'addRole/:id', component: AddRoleComponent, data: { title: '修改角色', module: 'role', power: "UPDATE" } }
];

//一定要将路由加载的模块导出到主模块
export const RoleComponentList = [
    RoleComponent,
    AddRoleComponent
];
