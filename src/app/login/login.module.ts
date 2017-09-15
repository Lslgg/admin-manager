import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, URLSearchParams } from '@angular/http';
import { CommonModule as SystemCommonModule } from '@angular/common';
import { LoginRoutingModule, ComponentList} from './login.routing'
import { LoginComponent } from './login.component'

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        SystemCommonModule,
        LoginRoutingModule
    ],
    exports: [],
    declarations: [
        LoginComponent,
        ComponentList
    ],
    bootstrap: [
        LoginComponent
    ],
    providers: [],
})
export class LoginModule { }
