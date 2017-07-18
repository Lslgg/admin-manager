import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexRoutes, IndexComponentList } from './index/index.routing'

export var routeList: Routes = [];

//首页
routeList = routeList.concat(IndexRoutes);


@NgModule({
    imports: [RouterModule.forChild(routeList)],
    exports: [RouterModule]
})


export class HomeRoutingModule { }

//一定要将路由加载的模块导出到admin.module模块
export const ComponentList = [
    IndexComponentList,
]