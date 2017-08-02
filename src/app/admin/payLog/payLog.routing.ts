import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { PayLogComponent } from './index';

export const PayLogRoutes: Routes = [
  { path: 'payLog', component: PayLogComponent, data: { title: '充值统计', module: 'payLog', power: "SHOW" } },
];

//一定要将路由加载的模块导出到主模块
export const PayLogComponentList = [
  PayLogComponent,
];

