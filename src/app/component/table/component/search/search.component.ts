import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'search-item',
    styleUrls: ['search.css'],
    templateUrl:'search.html'
})

export class SearchComponent implements OnInit {

    @Input() name: string;

    @Input() title: string;

    @Input() type: string;

    @Input() condition:string='=';

    @Input() dataList:Array<{key:string,value:string}>=[];

    constructor() {

    }

    ngOnInit() { }
    
}