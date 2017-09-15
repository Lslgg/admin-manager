import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexRoutes, IndexComponentList } from './index/index.routing';
import { UserRoutes, UserComponentList } from './user/user.routing';
import { RoleRoutes, RoleComponentList } from './role/role.routing';
import { MenuRoutes, MenuComponentList } from './menu/menu.routing';
import { PowerRoutes, PowerComponentList } from './power/power.routing';
import { PlayerRoutes, PlayerComponentList } from './player/player.routing';
import { CardRoutes, CardComponentList } from './card/card.routing';
import { SystemRoutes, SystemComponentList } from './system/system.routing';
import { PayLogRoutes, PayLogComponentList } from './payLog/payLog.routing';
import { DealerRoutes, DealerComponentList } from './dealer/dealer.routing';
import { AdvertRoutes, AdvertComponentList } from './advert/advert.routing';
import { NotFindPageRoutes, NotFindPageComponentList } from '../component/404/notFindPage.routing';
import { AuthGuard } from './common/server/auth-guard.service';

import { AdminComponent } from './admin.component';

var routes:Routes=[];

//首页
routes = routes.concat(IndexRoutes);
//用户管理
routes = routes.concat(UserRoutes);
//角色管理
routes = routes.concat(RoleRoutes);
//菜单管理
routes = routes.concat(MenuRoutes);
//权限管理
routes = routes.concat(PowerRoutes);
//玩家充值管理
routes = routes.concat(PlayerRoutes);
//房卡管理
routes = routes.concat(CardRoutes);
//系统管理
routes = routes.concat(SystemRoutes);
//充值统计
routes = routes.concat(PayLogRoutes);
//群主管理
routes = routes.concat(DealerRoutes);
//群主管理
routes = routes.concat(AdvertRoutes);
//错误页面
routes = routes.concat(NotFindPageRoutes);

export var routeList: Routes = [
  {
    path: '', canActivateChild: [AuthGuard],
    component: AdminComponent, data: { title: '后台管理' },
    children: routes
  }
];

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
  CardComponentList,
  SystemComponentList,
  NotFindPageComponentList,
  PayLogComponentList,
  DealerComponentList,
  AdvertComponentList
]
