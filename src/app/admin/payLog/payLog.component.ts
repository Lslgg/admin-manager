import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'admin-payLog',
    templateUrl: 'payLog.html'
})

export class PayLogComponent implements OnInit {

    startDate:Date=new Date();

    stopDate:Date=new Date();

    constructor() { 
        this.startDate.setDate(1);
        this.stopDate.setMonth(this.startDate.getMonth()+1);
        this.stopDate.setDate(1);
    }

    ngOnInit() { }
}