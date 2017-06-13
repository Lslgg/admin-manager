import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableService } from './shared/table.service'

import {
    DataTableComponent,
    TheadComponent,
    TbodyComponent,
    TfooterComponent,
    PagiationComponent,
    TbodyTdComponent,
    SearchComponent,
} from "./component/index";

let commonList = [
    DataTableComponent,
    TheadComponent,
    TbodyComponent,
    TfooterComponent,
    PagiationComponent,
    TbodyTdComponent,
    SearchComponent
];

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        commonList
    ],
    declarations: [
        commonList
    ],
    providers: [TableService],
})
export class TableModule { }
