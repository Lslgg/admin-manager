import { Component, OnInit, Input, ViewChildren, ContentChild, ElementRef, 
    AfterViewInit, Output, EventEmitter, ViewChild,QueryList } from '@angular/core';
import { TheadComponent } from './thead.component';
import { TbodyComponent } from './tbody/tbody.component';
import { SearchComponent } from './search/search.component';



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
            //如果是自己查找设置统计
            if(this.tbody.IsAutomaticList){
                var list=this.thead.rowList.filter(p=>p.type=="total");
                var totals:Array<{name:string,title:string,total:number}>=[];
                list.forEach(p=>{
                    totals.push({name:p.name,title:p.title,total:0})
                })
                this.tbody.setTotal(totals);
                this.tbody.getTotal();
            }
            this.tbody.pagiztionColSpan=this.thead.rowList.length;
        }, 1);
    }

    ngOnInit() {
        this.tbody.moduleName = this.modlueName;
        this.tbody.conditionList=this.conditionList;
    }

    search() { 
        let elementList = this.headerViewChild.nativeElement.querySelectorAll("#searchItem");
        let length = elementList.length;
        let list: Array<{ field: string, value: string, condition: string }> = [];

        for (var index = 0; index < length; index++) {
            let self = elementList[index];
            let field = self.getAttribute("data-name"); 
            let valueType = self.getAttribute("data-type");
            let condition = self.getAttribute("data-condition");
            let info = self.getElementsByClassName(field);
            let value = info[0].value;
            
            //查询数据时数据类型不对，查不到数据！
            if(valueType=="date"){ 
                info=info[0].querySelectorAll("input");
                value =new Date(info[0].value);
            }

            if(valueType=="number"){
                if(value!=""){
                    value=parseInt(value);
                }
            }

            list.push({ field, value, condition });
        }
        
        this.tbody.conditionList=list;
        if(this.tbody.IsAutomaticList){
            this.tbody.getPage(1);
            this.tbody.getTotal();
        }
        
        this.onSearch.emit(list);
    }

}
