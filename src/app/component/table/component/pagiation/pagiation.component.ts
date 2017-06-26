import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'pagiation',
    styleUrls: ['../table.css'],
    templateUrl: 'pagiation.html'
})

export class PagiationComponent implements OnInit {

    @Input() pageCount: number = 0;

    @Input() pageSize: number = 10;
    
    //最大显示多少页码
    @Input() maxPage: number = 8;

    @Output() ongetPage = new EventEmitter<number>();

    PagiationStrList: number[] = Array();

    LastPage: number = 0; //最后一页

    constructor() {

    }

    ngOnInit() {

    }

    //下一页
    getPage(index: number) {
        this.ongetPage.emit(index);
        this.setPageInfo(index);
    }

    //设置页码
    private setPageInfo(pageIndex: number) {

        this.PagiationStrList = [];

        let pageCount = this.getPageCount();

        let startIndex = 1;
        let lastIndex = 0;

        //如果页码不够设置的最页数不用隐藏页面直接显示页码
        startIndex = 1;
        lastIndex = pageCount;
        if (lastIndex < this.maxPage) {
            while (startIndex <= lastIndex) {
                this.PagiationStrList.push(startIndex);
                startIndex += 1;
            }
            return;
        }
        

        startIndex = 1;
        lastIndex = this.maxPage;
        var half=this.maxPage/2;
        //只显示最大页数
        if (pageIndex > half) { //从最大页数的一半隐藏
            startIndex=pageIndex-1;
            lastIndex=(startIndex+this.maxPage)-1;
            //如果是最后一页了只显示最后到开如最大的页数
            if(lastIndex>pageCount){ 
                lastIndex=pageCount;
                startIndex=lastIndex-this.maxPage+1;
            }
        }

        while (startIndex <= lastIndex) {
            this.PagiationStrList.push(startIndex);
            startIndex += 1;
        }
    }

    //获取总页数
    private getPageCount(): number {
        let sum = isNaN(this.pageCount) ? 1 : this.pageCount;
        let size = isNaN(this.pageSize) ? 10 : this.pageSize;
        let pageCount = parseInt((sum / size).toString());
        pageCount += sum % size == 0 ? 0 : 1;
        this.LastPage = pageCount;
        return pageCount;
    }

    ngOnChanges() {
        if (this.pageCount == 0) return;
        this.setPageInfo(1);
    }
}