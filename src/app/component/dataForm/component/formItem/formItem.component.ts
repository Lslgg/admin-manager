import {
    Component, OnInit, Input, 
    ElementRef, AfterViewInit, Output,
    ContentChildren, QueryList
} from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';

import { ValidatorComponent } from '../validator/validator.component'

@Component({
    selector: 'form-item',
    templateUrl: 'formItem.html'
})

export class FormItemComponent implements OnInit {

    @Input() name: string;

    @Input() title: string;

    @Input() type: string;

    @Input() formInfo: FormGroup;
    
    @Input() formContent: any;

    @Input() dataList:Array<{key:string,value:string}>=[];

    @ContentChildren(ValidatorComponent) validatorList: QueryList<ValidatorComponent>;

    constructor() {

    }

    ngOnInit() {
        
    }

    ngAfterContentInit() {
       this.validatorList.forEach(val=>{
           val.formInfo=this.formInfo;
           val.name=this.name;
       })
    }
}