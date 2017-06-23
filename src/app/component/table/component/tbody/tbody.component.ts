import {
    Component, OnInit, ElementRef, ViewChildren,
    Input, Output, EventEmitter, ContentChild, ViewChild
} from '@angular/core';

import { PagiationComponent } from '../pagiation/pagiation.component';

import { TableService } from '../../shared/table.service';

@Component({
    selector: 'tbody',
    styleUrls: ['../table.css'],
    templateUrl: 'tbody.html',
    providers: [TableService],

})

export class TbodyComponent implements OnInit {

    @Input() dataList: Array<Object>=[];

    @Input() isAutomaticList:boolean=true;

    @Input() key: string = "id";

    @Input() isShowPagiation:boolean=true;

    @Input() pageSize: number = 10;

    @Input() IsOnUpdate: boolean = false;
    @Output() onUpdate = new EventEmitter<string>();

    @Input() IsOnDelete: boolean = false;
    @Output() onDelete = new EventEmitter<string>();

    @Input() IsOnIsValue: boolean = false;
    @Output() onIsValue = new EventEmitter<string>();

    @Input() IsSetInfo: boolean = false;
    @Output() onSetInfo = new EventEmitter<IdType>();

    @Output() ongetPageList=new EventEmitter<number>();

    @ContentChild(PagiationComponent) Pagiation: PagiationComponent;

    rowNameList: Array<{ name: string, type: string, columnSpan: number, rowsetSpan: number }> = [];

    pagiztionColSpan: number = 1;

    operationList: Array<string> = [];

    pageCount: number;

    moduleName: string = "";

    conditionList: ConditionList = [];

    constructor(private tbs: TableService, public elementRef: ElementRef) {

    }

    ngOnInit() {
        let operation = this.elementRef.nativeElement.getAttribute("operation");
        if (operation) {
            this.operationList = operation.split("|");
        }
        
        if(this.isAutomaticList){
            this.ongetPage(1);
        }
    }

    ongetPage(pageIndex: number) {
        this.tbs.Parse.pages.index = pageIndex;
        this.tbs.Parse.pages.size = this.pageSize;
        this.tbs.Parse.pages.name = this.moduleName;
        this.tbs.Parse.pages.coditions = this.conditionList;
        this.dataList=[];
        this.tbs.getDataList(this.tbs.Parse.pages).then(result => {
            result.list.forEach(p=>{
                this.dataList.push(Object.assign(p,{isCheck:false}));
            })
            this.pageCount = result.count;
        })
    }

    onchecked(item:object,ischeck:boolean){
        item["isCheck"]=ischeck;
    }

    delInfo(id: string) {
        if (confirm("是否真的要删除！")) {
            this.onDelete.emit(id);
            this.dataList = this.dataList.filter(val => val["id"] != id);
            this.pageCount = this.pageCount - 1;
            if (this.IsOnDelete) return;
            this.tbs.delInfo(id,this.moduleName).then(success=>{
                alert(success?"删除成功！":"删除失败！");
            })
        }
    }

    update(id: string) {
        this.onUpdate.emit(id);
        if (this.IsOnUpdate) return;
    }

    isValue(id: string) {
        this.onIsValue.emit(id);
        if (this.IsOnIsValue) return;

    }

    setInfo(info: IdType) {
        this.onSetInfo.emit(info);
    }

}