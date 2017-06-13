import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TableService } from '../../shared/table.service'


@Component({
    selector: 'pagiation',
    styleUrls:['../table.css'],
    templateUrl: 'pagiation.html'
})

export class PagiationComponent {

    @Input() pageCount: number;

    @Input() pageSize: number;

    @Output() ongetPage = new EventEmitter<number>();

    pageIndex: number = 1;

    PagiationStrList: number[] = Array();

    LastNumber: number = 10; //最后页码

    LastPage: number = 0; //最后一页

    constructor(private tableService: TableService) {

    }

    //下一页
    getPage(index: number) {
        this.pageIndex = index;
        this.ongetPage.emit(index);
        this.setPageInfo(index);
    }

    //设置页码
    private setPageInfo(pageIndex: number) {
        this.PagiationStrList = [];

        let last = this.getPageCount();
        let pageCount = last;
        let index = pageIndex;
        let i = 1;
        let lastIndex = 10;

        //如果页码不够10页不用隐藏页面直接显示页码
        if (pageCount <= 10) {
            i = 1;
            lastIndex = pageCount;
            this.LastNumber = lastIndex;
        } else {
            //隐藏大于第五页时前面的页码
            if (index > 5) {
                i = index - 1;
                lastIndex += index - 2;
                //如果是最后10页，只显示最后10页不隐藏
                if (pageCount - index <= 10 && index > pageCount - 9) {
                    i = pageCount - 9;
                    lastIndex = pageCount;
                }
            }
        }

        while (i <= lastIndex) {
            this.PagiationStrList.push(i);
            i += 1;
        }
    }

    //获取总页数
    private getPageCount(): number {
        let sum = this.pageCount;
        let size = this.pageSize;
        let pageCount = parseInt((sum / size).toString());
        pageCount += sum % size == 0 ? 0 : 1;
        return pageCount;

    }

    ngOnChanges() {
        let last = this.getPageCount();
        this.LastPage = last;
        this.setPageInfo(1);
    }
}