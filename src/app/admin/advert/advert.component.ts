import { Component, OnInit } from '@angular/core';
import { AdvertService, Advert } from './shared'
import { Router } from '@angular/router';

@Component({
    selector: 'admin-advert',
    templateUrl: 'advert.html',
    providers: [AdvertService]
})

export class AdvertComponent implements OnInit {

    typeList: Array<{ key: string, value: string }>;
    constructor(private router: Router,
        private advertService: AdvertService) {
        this.typeList = [
            { key: "", value: "全部" },
            { key: "1", value: "大厅广告" },
            { key: "2", value: "活动广告" }];
    }

    ngOnInit() { 
       
    }

    onAdd() {
        this.router.navigate(['../admin/addAdvert']);
    }

    onSetInfo(info: IdType) {
        if (info.type == "title") {
            this.router.navigate(['../admin/addAdvert', info.id]);
        }
    }
}