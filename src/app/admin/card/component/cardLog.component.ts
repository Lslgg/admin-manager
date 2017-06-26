import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'admin-cardLog',
    templateUrl: 'cardLog.html'
})

export class CardLogComponent implements OnInit {
    
    startDate:Date=new Date();

    stopDate:Date=new Date();
    
    constructor() { }

    ngOnInit() { }
}
