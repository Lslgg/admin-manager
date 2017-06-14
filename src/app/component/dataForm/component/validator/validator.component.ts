import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'form-validator',
    templateUrl: 'validator.html'
})

export class ValidatorComponent implements OnInit {

    @Input() name: string;

    @Input() title: string;

    @Input() type: string;

    @Input() value: string;

    @Input() formInfo:FormGroup;

    constructor() { }

    ngOnInit() {
        
    }
}