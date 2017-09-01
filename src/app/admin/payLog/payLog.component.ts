import { Component, OnInit } from '@angular/core';
import { PayLogService } from "./shared";

@Component({
    selector: 'admin-payLog',
    templateUrl: 'payLog.html',
    providers:[PayLogService]
})

export class PayLogComponent implements OnInit {

    startDate:Date=new Date();

    stopDate:Date=new Date();

    constructor(private payLogService:PayLogService) { 
        this.startDate.setDate(1);
        this.stopDate.setMonth(this.startDate.getMonth()+1);
        this.stopDate.setDate(1);
    }

    ngOnInit() {
        // this.payLogService.getStatstic();
        // this.payLogService.getStatstic_card();
    }
}