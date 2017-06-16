import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { IndexComponent } from './index.component';

export const IndexRoutes: Routes = [
   { path: '', component: IndexComponent, data: { title: '首页', module: 'index', power: "SHOW" } },
   { path: 'index', component: IndexComponent, data: { title: '首页', module: 'index', power: "SHOW" } },
];

//一定要将路由加载的模块导出到主模块
export const IndexComponentList = [IndexComponent];

