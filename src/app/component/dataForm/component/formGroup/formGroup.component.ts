import { Component, OnInit,Input,ContentChildren,QueryList,HostBinding } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'form-group',
    templateUrl: 'formGroup.html',
    host: { 'class': 'col-md-12' }
})

export class FormGroupComponent implements OnInit {

    @Input() formInfo:FormGroup;

    @Input() name:string;

    @Input() isRootClass:boolean=true;

    @HostBinding('class.col-md-12') colmd12: boolean;
    
    constructor() { }

    ngOnInit() { 
        this.colmd12 = this.isRootClass; 
    }
}