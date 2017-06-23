import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { PowerComponent,AddPowerComponent } from './index';

export const PowerRoutes: Routes = [
  { path: 'power', component: PowerComponent, data: { title: '设置权限', module: 'power', power: "SHOW" } },
  { path: 'addpower', component: AddPowerComponent, data: { title: '权限列表', module: 'RolePower', power: "ADD" } },
];

//一定要将路由加载的模块导出到主模块
export const PowerComponentList = [
    PowerComponent,
    AddPowerComponent
];

