import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'form-group',
    templateUrl: 'formGroup.html'
})

export class FormGroupComponent implements OnInit {

    @Input() formInfo:FormGroup;

    constructor() { }

    ngOnInit() { 
        console.log(this.formInfo);
    }
}