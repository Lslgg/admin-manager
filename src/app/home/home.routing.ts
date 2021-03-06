import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexRoutes, IndexComponentList } from './index/index.routing'
import { HomeComponent } from './home.component';

var routes: Routes = [];

//首页
routes = routes.concat(IndexRoutes);
export var routeList: Routes = [
    {
        path: '', component: HomeComponent, data: { title: '首页' },
        children: routes
    }
];

@NgModule({
    imports: [RouterModule.forChild(routeList)],
    exports: [RouterModule]
})


export class HomeRoutingModule { }

//一定要将路由加载的模块导出到admin.module模块
export const ComponentList = [
    IndexComponentList,
]