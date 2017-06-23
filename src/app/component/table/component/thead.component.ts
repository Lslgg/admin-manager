import { Component, OnInit, ElementRef, ViewChild,Output, EventEmitter,Input } from '@angular/core';

@Component({
    selector: 'thead',
    styleUrls:['./table.css'],
    template: ` 
        <tr class="theadTr" #theadTr>
            <th *ngIf="isShowCheckbox" name="#" type="checkbox" width="20"> 
                <input type="checkbox" name="checkAll" (click)="allchecked(checkAll.checked)" #checkAll>
            </th>
            <ng-content select="th"></ng-content>
        </tr>
    `
})

export class TheadComponent implements OnInit {

    rowList: Array<{ name: string, type: string, columnSpan: number, rowsetSpan: number }> = [];

    @Output() onCheckAll= new EventEmitter<Boolean>();

    @Input() isShowCheckbox:boolean=true;

    constructor(public elementRef: ElementRef) {

    }

    @ViewChild('theadTr') headerViewChild: ElementRef;

    ngAfterViewInit() {
        var list = this.headerViewChild.nativeElement.querySelectorAll("th");
        for (var index = 0; index < list.length; index++) {
            let name = list[index].getAttribute("name");
            let type = list[index].getAttribute("type");
            let columnSpan = list[index].getAttribute("columnSpan");
            let rowsetSpan = list[index].getAttribute("rowsetSpan");

            this.rowList.push({
                name: name,
                type: type ? type : "string",
                columnSpan: columnSpan ? columnSpan : 1,
                rowsetSpan: rowsetSpan ? rowsetSpan : 1
            });
        }
    }

    ngOnInit() { }

    allchecked(checked:boolean){
        this.onCheckAll.emit(checked);
    }
}