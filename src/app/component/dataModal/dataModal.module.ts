import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';

import { DataModalComponent } from './dataModal.component';

@NgModule({
    imports: [
        CommonModule,
        ModalModule
    ],
    exports: [ DataModalComponent ],
    declarations: [ DataModalComponent ],
    providers: [],
})
export class DataModalModule { }
