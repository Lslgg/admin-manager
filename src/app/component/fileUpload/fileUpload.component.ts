import { Component, ElementRef, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { FileUploadService } from './shared/fileUpload.service';

@Component({
    selector: 'file-upload',
    styles:[`
        .uploadImg{width:120px;height:80px;}
        ul{padding:5px; border:solid 1px white;margin-top:12px; border-radius:5px;
            -moz-box-shadow:1px 1px 3px #EAEAEA; -webkit-box-shadow:1px 1px 3px #EAEAEA; box-shadow:1px 1px 3px #EAEAEA;
        }
        ul>li{float:left; margin-left:6px;}
    `],
    template: `
        <input type="file" [multiple]="multiple" (change)="fileChange($event)">
        <ul class="clearfix">
            <li *ngFor="let fileUrl of fileUrlList let i=index">
                <img src="{{fileUrl}}" alt="" class="uploadImg">
                <a (click)="deleteFile(fileUrl)">删除</a>
            </li>
        </ul>
    `,
    providers: [FileUploadService]
})

export class FileUploadComponent {

    @Input() multiple: boolean = true;

    @Output() onFileChange = new EventEmitter<Array<string>>();

    @Output() onDeleteFile= new EventEmitter<Array<string>>();
    

    @Input() fileUrlList: Array<string> = new Array<string>();
    @Input() fileNameList:Array<string> = new Array<string>();

    constructor(private fuService: FileUploadService) { }

    fileChange(event) {
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            let file: File = fileList[0];
            this.fuService.fileLoad(file, file.name)
                .then(url => {
                    this.fileUrlList.push(url);
                    var fileName=this.getFileName(url);
                    this.fileNameList.push(fileName);
                    this.onFileChange.emit(this.fileNameList);
                });
        }
    }

    deleteFile(fileUrl:string){
        var fileName=this.getFileName(fileUrl);
        this.fuService.deleteFile(fileName).then(success=>{
            if(success){
                alert("删除成功!");
                this.fileUrlList=this.fileUrlList.filter(p=> p!=fileUrl);
                this.fileNameList=this.fileNameList.filter(p=> p!=fileUrl);
                this.onDeleteFile.emit(this.fileNameList);
            }
        })
    }

    private getFileName(fileUrl:string):string{
        let fileArray=fileUrl.split('/');
        let fileName=fileArray[fileArray.length-1];
        return fileName;
    }
}