import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 
import { DatepickerModule } from 'angular2-material-datepicker';

import {
   DataFormComponent,
   FormItemComponent,
   FormGroupComponent,
   ValidatorComponent
} from "./component/index";

let commonList = [
  DataFormComponent,
  FormItemComponent,
  FormGroupComponent,
  ValidatorComponent
];

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        DatepickerModule
    ],
    exports: [
        commonList
    ],
    declarations: [
        commonList
    ],
    providers: [],
})
export class DataFormModule { }
