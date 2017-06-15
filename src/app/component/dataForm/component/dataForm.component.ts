import {
    Component, OnInit, Input, EventEmitter,
    AfterViewInit, Output, ContentChildren, QueryList
} from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';

import { FormItemComponent } from './formItem/formItem.component';

@Component({
    selector: 'data-form',
    templateUrl: 'dataForm.html'
})

export class DataFormComponent implements OnInit {

    @Input() formInfo: FormGroup;

    @Input() isOnSubmit: boolean = false;
    @Output() onSubmit = new EventEmitter<any>();

    formList: Array<{ name: string, title: string, formType: string }> = [];

    @ContentChildren(FormItemComponent) formItemList: QueryList<FormItemComponent>;

    constructor(private fb: FormBuilder) {

    }

    ngOnInit() {
    }

    ngAfterContentInit() {
        this.formItemList.forEach(element => {
            element.formInfo = this.formInfo;
            element.ngAfterContentInit();
        });
    }

    submit() {
        console.log(this.formInfo.value);
        this.onSubmit.emit(this.formInfo.value);
    }

}