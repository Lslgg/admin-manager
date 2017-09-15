import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NotPowerComponent,NotFindPageComponent } from './index';

export const NotFindPageRoutes: Routes = [
    { path: 'notPower', component: NotPowerComponent, data: { title: '没有权限', module: 'notPower', power: "notPower" } },
    { path: '**', component: NotFindPageComponent, data: { title: '404', module: '404', power: "SHOW" } },
];

//一定要将路由加载的模块导出到主模块
export const NotFindPageComponentList = [NotPowerComponent,NotFindPageComponent];
