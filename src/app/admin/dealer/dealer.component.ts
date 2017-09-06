import { Component, OnInit } from '@angular/core';
import { DealerService, Dealer } from "./shared";
import { Router } from '@angular/router';

@Component({
    selector: 'admin-dealer',
    templateUrl: 'dealer.html',
    providers: [DealerService]
})

export class DealerComponent implements OnInit {

    pageSize: number = 10;

    pageCount: number = 1;

    dealerList: Array<Dealer>;

    searchInfo: Dealer=new Dealer();

    constructor(private router: Router, private dealserService: DealerService) {
        this.getDealerList(1);
    }

    ngOnInit() {
    }

    onAdd() {
        this.router.navigate(['../admin/addDealer']);
    }

    ongetPage(pageIndex: number) {
        this.getDealerList(pageIndex);
    }

    onSearch(conInfo: ConditionList) {
        this.setSearchInfo(conInfo);
        this.getDealerList(1);
    }

    getDealerList(pageIndex: number) {
        this.dealserService.getList(pageIndex, this.pageSize,
            this.searchInfo).then(page => {
                this.dealerList = page.list;
                this.pageCount = page.count;
        });
    }

    onUpdate(id: string) {
        this.router.navigate(['../admin/addDealer', id]);
    }

    setSearchInfo(conInfo: ConditionList) {
        conInfo.forEach(p => {
            if (p.field == "Name") {
                this.searchInfo.Name = p.value.toString();
            }
            if (p.field == "Code") {
                this.searchInfo.Code = p.value.toString();
            }
        })
    }
}