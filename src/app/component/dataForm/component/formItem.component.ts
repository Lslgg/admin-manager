import {
    Component, OnInit, Input, ViewChildren, ContentChild,
    ElementRef, AfterViewInit, Output, EventEmitter, ViewChild
} from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'form-item',
    templateUrl:'formItem.html'
})

export class FormItemComponent implements OnInit {

    @Input() name:string;

    @Input() title:string;

    @Input() type:string;

    @Input() formInfo:FormGroup;
    
    constructor() { }

    ngOnInit() { }

}