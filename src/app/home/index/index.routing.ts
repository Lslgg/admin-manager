import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { IndexComponent } from './index.component';
import { SliedComponent } from './component/slide.component';
import { IntroductionComponent } from './component/introduction.component';
import { RuleComponent } from './component/rule.component';
import { AboutComponent } from './component/about.component';

import { HaderComponent } from './component/hader.component';
import { FooterComponent } from './component/footer.component';

import { HomeBriefComponent } from './homeBrief.component';
import { HomeRuleComponent } from './homeRule.component';
import { HomeAboutComponent } from './homeAbout.component';


export const IndexRoutes: Routes = [
   { path: '', component: IndexComponent, data: { title: '首页', module: 'index', power: "SHOW" } },
   { path: 'index', component: IndexComponent, data: { title: '首页', module: 'index', power: "SHOW" } },
   { path: 'introduction', component: HomeBriefComponent, data: { title: '简介', module: 'index', power: "SHOW" } },
   { path: 'rule', component: HomeRuleComponent, data: { title: '规则玩法', module: 'index', power: "SHOW" } },
   { path: 'about', component: HomeAboutComponent, data: { title: '关于我们', module: 'index', power: "SHOW" } },
];

//一定要将路由加载的模块导出到主模块
export const IndexComponentList = [
    HaderComponent,
    IndexComponent,
    SliedComponent,
    IntroductionComponent,
    RuleComponent,
    AboutComponent,
    FooterComponent,
    HomeBriefComponent,
    HomeRuleComponent,
    HomeAboutComponent
];

