import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexRoutes,ShowIndex } from './index/';
import { UserRoutes,UserList} from './user';

export var routeList: Routes = [];

routeList=routeList.concat(IndexRoutes);
routeList=routeList.concat(UserRoutes);

@NgModule({
  imports: [RouterModule.forChild(routeList)],
  exports: [RouterModule]
})


export class AdminRoutingModule { }

//一定要将路由加载的模块导出到admin.module模块
export const ComponentList = [
  ShowIndex,
  UserList
]
