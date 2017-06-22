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

    @Input() dataList: Array<Object>;

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

        this.ongetPage(1);
    }

    ongetPage(pageIndex: number) {
        this.tbs.Parse.pages.index = pageIndex;
        this.tbs.Parse.pages.size = this.pageSize;
        this.tbs.Parse.pages.name = this.moduleName;
        this.tbs.Parse.pages.coditions = this.conditionList;
        this.tbs.getDataList(this.tbs.Parse.pages).then(result => {
            this.dataList = result.list;
            this.pageCount = result.count;
        })
    }

    delInfo(id: string) {
        if (confirm("是否真的要删除！")) {
            this.onDelete.emit(id);
            this.dataList = this.dataList.filter(val => val["id"] != id);
            this.pageCount = this.pageCount - 1;
            if (this.IsOnDelete) return;
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