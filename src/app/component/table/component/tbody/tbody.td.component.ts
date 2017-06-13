import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: '[tbody-td]',
    templateUrl:'tbody.td.html'
})

export class TbodyTdComponent implements OnInit {

    @Input() title: string;

    @Input() colType: string;

    @Input() id: string;

    @Input() field: string;

    @Output() onEventList = new EventEmitter<any>();

    constructor() { }

    ngOnInit() { }

    eventList(id: string, type: string) {
        this.onEventList.emit({id,type});
    }
}