import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexRoutes, IndexComponentList } from './index/';
import { UserRoutes, UserComponentList } from './user/user.routing';
import { RoleRoutes, RoleComponentList } from './role/role.routing';
import { MenuRoutes, MenuComponentList } from './menu/menu.routing';
import { PowerRoutes,PowerComponentList } from './power/power.routing';
import { PlayerRoutes, PlayerComponentList } from './player/player.routing';
import { NotFindPageComponent, NotPowerComponent } from '../component/404';


export var routeList: Routes = [];

//首页
routeList = routeList.concat(IndexRoutes);
//用户管理
routeList = routeList.concat(UserRoutes);
//角色管理
routeList = routeList.concat(RoleRoutes);
//菜单管理
routeList = routeList.concat(MenuRoutes);
//权限管理
routeList = routeList.concat(PowerRoutes);
//玩家充值管理
routeList = routeList.concat(PlayerRoutes);

routeList = routeList.concat([
   { path: 'notPower', component: NotPowerComponent, data: { title: '没有权限', module: 'notPower', power: "notPower" } },
   { path: '**', component: NotFindPageComponent, data: { title: '没有发现页面', module: 'none', power: "none" } },
   
]);


@NgModule({
  imports: [RouterModule.forChild(routeList)],
  exports: [RouterModule]
})


export class AdminRoutingModule { }

//一定要将路由加载的模块导出到admin.module模块
export const ComponentList = [
  IndexComponentList, 
  UserComponentList, 
  RoleComponentList,
  MenuComponentList,
  PowerComponentList,
  PlayerComponentList,
  NotFindPageComponent,
  NotPowerComponent
]
