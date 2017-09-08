import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';

import { FileUploadComponent } from './fileUpload.component';

@NgModule({
    imports: [
        CommonModule,
        ModalModule
    ],
    exports: [ FileUploadComponent ],
    declarations: [ FileUploadComponent ],
    providers: [],
})
export class FileUploadModalModule { }