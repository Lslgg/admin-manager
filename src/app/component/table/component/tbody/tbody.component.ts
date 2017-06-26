import {
    Component, OnInit, ElementRef, ViewChildren,
    Input, Output, EventEmitter, ContentChild, ViewChild
} from '@angular/core';

import { PagiationComponent } from '../pagiation/pagiation.component';

import { TableService } from '../../shared/table.service';

@Component({
    selector: '.data-tbody',
    styleUrls: ['../table.css'],
    templateUrl: 'tbody.html',
    providers: [TableService],

})

export class TbodyComponent implements OnInit {

    //表格数据
    @Input() dataList: Array<Object> = [];

    //是否自动加载数据
    @Input() IsAutomaticList: boolean = true;

    //数据主键用于对数据的操作
    @Input() key: string = "id";

    //是否显示分页
    @Input() isShowPagiation: boolean = true;

    //分页大小
    @Input() pageSize: number = 10;

      //数据总数
    @Input() pageCount: number=0;

    //下一页事件
    @Output() ongetPage = new EventEmitter<number>();

    //是否自己修改和修改事件
    @Input() IsOnUpdate: boolean = false;
    @Output() onUpdate = new EventEmitter<string>();

    //是否自已删除和删除事件
    @Input() IsOnDelete: boolean = false;
    @Output() onDelete = new EventEmitter<string>();

    //是否设置有效和事件
    @Input() IsOnIsValue: boolean = false;
    @Output() onIsValue = new EventEmitter<string>();

    //根据类型来处理的事件
    @Output() onSetInfo = new EventEmitter<IdType>();

    //获取分页控件
    @ContentChild(PagiationComponent) Pagiation: PagiationComponent;

    //表格头部信息根据这信息来处理表格
    rowNameList: Array<{ name: string, type: string, columnSpan: number, rowsetSpan: number }> = [];

    //分页行跨列
    pagiztionColSpan: number = 1;

    //操作处理
    operationList: Array<string> = [];
  
    //表名
    moduleName: string = "";

    //分页数据条件
    conditionList: ConditionList = [];

    constructor(private tbs: TableService, public elementRef: ElementRef) {
        		

    }

    ngOnInit() {
        //获取操作事件
        let operation = this.elementRef.nativeElement.getAttribute("operation");
        if (operation) {
            this.operationList = operation.split("|");
        }
        
        //是否自动加载，如果是就加载
        if (this.IsAutomaticList) {
            this.getPage(1);
        }
    }

    //分页
    getPage(pageIndex: number) {
        this.ongetPage.emit(pageIndex);
        //如果是自动就加载
        if (this.IsAutomaticList) {
            this.tbs.Parse.pages.index = pageIndex;
            this.tbs.Parse.pages.size = this.pageSize;
            this.tbs.Parse.pages.name = this.moduleName;
            this.tbs.Parse.pages.coditions = this.conditionList;
            let oldDataList = [];
            this.tbs.getDataList(this.tbs.Parse.pages).then(result => {
                result.list.forEach(p => {
                    oldDataList.push(Object.assign(p, { isCheck: false }));
                })
                this.dataList=oldDataList;
                //为了查找表格能重新加载一次
                this.pageCount = result.count==0?-1:result.count;
            })
        }
    }
    
    //checkbox 事件设置当前这条数据是否选中
    onchecked(item: object, ischeck: boolean) {
        item["isCheck"] = ischeck;
    }

    //删除事件
    delInfo(id: string) {
        if (confirm("是否真的要删除！")) {
            this.onDelete.emit(id);
            this.dataList = this.dataList.filter(val => val["id"] != id);
            this.pageCount = this.pageCount - 1;
            if (this.IsOnDelete) return;
            this.tbs.delInfo(id, this.moduleName).then(success => {
                alert(success ? "删除成功！" : "删除失败！");
            })
        }
    }

    //修改事件
    update(id: string) {
        this.onUpdate.emit(id);
        if (this.IsOnUpdate) return;
    }

    //设置事件
    isValue(id: string) {
        this.onIsValue.emit(id);
        if (this.IsOnIsValue) return;

    }

    //根据类型来处理不同业务
    setInfo(info: IdType) {
        this.onSetInfo.emit(info);
    }

}