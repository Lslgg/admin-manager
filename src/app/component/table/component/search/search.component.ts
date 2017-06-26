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

    @Input() value:string|number|Date|boolean;

    @Input() condition:string='=';

    @Input() valueType:string|number|Date|boolean;

    @Input() dataList:Array<{key:string,value:string}>=[];

    constructor() {

    }

    ngOnInit() { }
    
}