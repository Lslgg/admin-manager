import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerModule } from 'angular2-material-datepicker';

import { TableService } from './shared/table.service'

import {
    DataTableComponent,
    TheadComponent,
    TbodyComponent,
    TfootComponent,
    PagiationComponent,
    TbodyTdComponent,
    SearchComponent,
} from "./component/index";

let commonList = [
    DataTableComponent,
    TheadComponent,
    TbodyComponent,
    TfootComponent,
    PagiationComponent,
    TbodyTdComponent,
    SearchComponent
];

@NgModule({
    imports: [CommonModule,DatepickerModule],
    exports: [commonList],
    declarations: [commonList],
    providers: [TableService],
})
export class TableModule { }
