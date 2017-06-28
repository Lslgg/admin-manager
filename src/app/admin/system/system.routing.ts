import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { SystemComponent } from './system.component';

export const SystemRoutes: Routes = [
   { path: 'system', component: SystemComponent, data: { title: '系统设置', module: 'system', power: "SHOW" } },
];

//一定要将路由加载的模块导出到主模块
export const SystemComponentList = [
    SystemComponent,
];

