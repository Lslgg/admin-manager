import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { FileUploadService } from './shared/fileUpload.service';

@Component({
    selector: 'file-upload',
    template: '<input type="file" [multiple]="multiple" (change)="fileChange($event)">',
    providers:[FileUploadService]
})

export class FileUploadComponent {

    @Input() multiple: boolean = true;

    constructor(private fuService: FileUploadService) { }

    fileChange(event) {
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            let file: File = fileList[0];
            this.fuService.fileLoad(file,file.name);
            let formData: FormData = new FormData();
        }
    }
}