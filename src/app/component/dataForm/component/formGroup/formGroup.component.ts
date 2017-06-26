import { Component, OnInit,Input,ContentChildren,QueryList } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'form-group',
    templateUrl: 'formGroup.html'
})

export class FormGroupComponent implements OnInit {

    @Input() formInfo:FormGroup;

    @Input() name:string;

    constructor() { }

    ngOnInit() { 
       
    }

    ngAfterContentInit(){

    }
}