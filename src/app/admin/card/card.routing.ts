import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { CardComponent, AddCardComponent, CardLogComponent } from './index';

export const CardRoutes: Routes = [
  { path: 'card', component: CardComponent, data: { title: '房卡管理', module: 'card', power: "SHOW" } },
  { path: 'cardLog', component: CardLogComponent, data: { title: '房卡日志', module: 'cardLog', power: "SHOW" } },
  { path: 'addCard/:id', component: AddCardComponent, data: { title: '添加房卡', module: 'card', power: "UPDATE" } },
];

//一定要将路由加载的模块导出到主模块
export const CardComponentList = [
  CardComponent,
  AddCardComponent,
  CardLogComponent
];

