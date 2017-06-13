import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'thead',
    styleUrls:['./table.css'],
    template: ` 
        <tr class="theadTr" #theadTr>
            <th name="#" type="checkbox"> <input type="checkbox" /> </th>
            <ng-content select="th"></ng-content>
        </tr>
    `
})

export class TheadComponent implements OnInit {

    rowList: Array<{ name: string, type: string, columnSpan: number, rowsetSpan: number }> = [];

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
}