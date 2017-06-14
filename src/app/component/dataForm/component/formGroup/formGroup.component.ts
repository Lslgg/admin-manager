import { Component, OnInit,Input,ContentChildren,QueryList } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
// import { FormItemComponent } from '../formItem/formItem.component';

@Component({
    selector: 'form-group',
    templateUrl: 'formGroup.html'
})

export class FormGroupComponent implements OnInit {

    @Input() formInfo:FormGroup;

    @Input() name:string;

    // @ContentChildren(FormItemComponent) formItemList: QueryList<FormItemComponent>;

    constructor() { }

    ngOnInit() { 
       
    }

    ngAfterContentInit(){

    }
}