import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { PlayerComponent,AddPlayerComponent } from './index';

export const PlayerRoutes: Routes = [
  { path: 'player', component: PlayerComponent, data: { title: '玩家管理', module: 'player', power: "SHOW" } },
  { path: 'addPlayer/:id', component: AddPlayerComponent, data: { title: '候改房卡', module: 'player', power: "UPDATE" } },
];

//一定要将路由加载的模块导出到主模块
export const PlayerComponentList = [
    PlayerComponent,
    AddPlayerComponent
];

