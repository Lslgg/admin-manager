import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, URLSearchParams } from '@angular/http';
import { CommonModule as SystemCommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { ComponentList, HomeRoutingModule } from './home.routing'

import { MouseWheelDirective } from './directive/mousewheel.directive'

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        SystemCommonModule,
        HomeRoutingModule,
    ],
    exports: [],
    declarations: [
        HomeComponent,
        ComponentList,
        MouseWheelDirective
    ],
    bootstrap: [
        HomeComponent
    ],
})
export class HomeModule { }
