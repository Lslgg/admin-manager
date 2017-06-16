import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { MenuComponent,AddMenuComponent } from './index';



export const MenuRoutes: Routes = [
   { path: 'menu', component: MenuComponent, data: { title: '菜单管理', module: 'menu', power: "SHOW" } },
  { path: 'addMenu/:id/:type', component: AddMenuComponent, data: { title: '修改菜单', module: 'menu', power: "UPDATE" } },
];

//一定要将路由加载的模块导出到主模块
export const MenuComponentList = [
    MenuComponent,
    AddMenuComponent
];




