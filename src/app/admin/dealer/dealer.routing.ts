import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { DealerComponent } from './dealer.component';
import { AddDealerComponent } from './component/addDealer.component';


export const DealerRoutes: Routes = [
   { path: 'dealer', component: DealerComponent, data: { title: '群主列表', module: 'dealer', power: "SHOW" } },
   { path: 'addDealer', component: AddDealerComponent, data: { title: '添加群主', module: 'dealer', power: "ADD" } },
   { path: 'addDealer/:id', component: AddDealerComponent, data: { title: '修改群主', module: 'dealer', power: "UPDATE" } },
   
];

//一定要将路由加载的模块导出到主模块
export const DealerComponentList = [
    DealerComponent,
    AddDealerComponent
];
