import {
    Component, OnInit, Input, ViewChildren, ContentChild,
    ElementRef, AfterViewInit, Output, EventEmitter, ViewChild
} from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'data-form',
    templateUrl: 'dataForm.html'
})

export class DataFormComponent implements OnInit {

    // @ViewChild('formItem') formViewChild: ElementRef;

    @Input() formInfo: FormGroup;

    formList: Array<{ name: string, title: string, formType: string }> = [];

    constructor(private fb: FormBuilder) {

    }

    ngOnInit() {
        // console.log(this.formInfo);
    }

    ngAfterViewInit() {
        // var list = this.formViewChild.nativeElement.querySelectorAll("form-item");
        // for (var index = 0; index < list.length; index++) {
        //     let self=list[index];
        //     let name = self.getAttribute("name");
        //     let title = self.getAttribute("title");
        //     let formType = self.getAttribute("formType");
        //     let valList=self.querySelectorAll("form-validator");
        //     this.formList.push({ name, title, formType });
        // }

    }

    onSubmit() {
       console.log(this.formInfo.value);
    }

}