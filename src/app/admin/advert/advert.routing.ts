import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { AdvertComponent,AddAdvertComponent } from './index';

export const AdvertRoutes: Routes = [
  { path: 'advert', component: AdvertComponent, data: { title: '广告列表', module: 'advert', power: "SHOW" } },
  { path: 'addAdvert', component: AddAdvertComponent, data: { title: '添加广告', module: 'advert', power: "ADD" } },
];

//一定要将路由加载的模块导出到主模块
export const AdvertComponentList = [
    AdvertComponent,
    AddAdvertComponent
];

