import { Component, OnInit } from '@angular/core';
import { AdvertService, Advert } from './shared'
import { Router } from '@angular/router';

@Component({
    selector: 'admin-advert',
    templateUrl: 'advert.html',
    providers:[AdvertService]
})

export class AdvertComponent implements OnInit {

    constructor(private router: Router,
        private advertService:AdvertService) { 

    }

    ngOnInit() { }

    onAdd(){
        this.router.navigate(['../admin/addAdvert']);
    }

    onSetInfo(info:IdType){
       if(info.type=="title"){
            this.router.navigate(['../admin/addAdvert',info.id]);
       }
    }
}