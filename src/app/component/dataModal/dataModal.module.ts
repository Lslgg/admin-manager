import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { DataModalComponent } from './dataModal.component';

@NgModule({
    imports: [
        FormsModule,
        ModalModule
    ],
    exports: [ DataModalComponent ],
    declarations: [ DataModalComponent ],
    providers: [],
})
export class DataModalModule { }
