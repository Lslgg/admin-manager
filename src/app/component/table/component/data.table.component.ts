import { Component, OnInit, Input, ViewChildren, ContentChild, ElementRef, AfterViewInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { TheadComponent } from './thead.component';
import { TbodyComponent } from './tbody/tbody.component';


@Component({
    selector: 'data-table',
    styleUrls:['./table.css'],
    templateUrl: 'data.table.html'

})

export class DataTableComponent implements OnInit {

    @Input() modlueName: string = "";

    @Input() isSearch: boolean = true;

    @Input() conditionList: ConditionList = [];

    @Output() onSearch = new EventEmitter<object>();

    @ViewChild('tableSearch') headerViewChild: ElementRef;

    @ContentChild(TheadComponent) thead: TheadComponent;

    @ContentChild(TbodyComponent) tbody: TbodyComponent;

    constructor() {

    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.tbody.rowNameList = this.thead.rowList;
            this.tbody.pagiztionColSpan=this.thead.rowList.length;
        }, 1);
    }

    ngOnInit() {
        this.tbody.moduleName = this.modlueName;
        this.tbody.conditionList=this.conditionList;
    }

    search() {
       
        let elementList = this.headerViewChild.nativeElement.querySelectorAll("search-item");
        let length = elementList.length;
        
        let list: Array<{ field: string, value: string, condition: string }> = [];

        for (var index = 0; index < length; index++) {
            let self = elementList[index];
            let field = self.getAttribute("ng-reflect-name");
            let valueType = self.getAttribute("ng-reflect-value-type");
            let condition = self.getAttribute("ng-reflect-condition");
            let info = self.getElementsByClassName(field);
            let value = info[0].value;
            
            if(valueType=="date"){ 
                info=info[0].querySelectorAll("input");
                value =new Date(info[0].value);
                console.log(value);
            }

            if(valueType=="number"){
                if(value!=""){
                    value=parseInt(value);
                }
            }

            list.push({ field, value, condition });
        }
        
        console.log(list);
        
        this.tbody.conditionList=list;
        if(this.tbody.IsAutomaticList){
            this.tbody.getPage(1);
        }
        
        this.onSearch.emit(list);
    }
}
