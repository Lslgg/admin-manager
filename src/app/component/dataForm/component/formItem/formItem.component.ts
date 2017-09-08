import {
    Component, OnInit, Input, 
    ElementRef, AfterViewInit, Output,
    ContentChildren, QueryList,HostBinding
} from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';

import { ValidatorComponent } from '../validator/validator.component'

@Component({
    selector: 'form-item',
    templateUrl: 'formItem.html',
})

export class FormItemComponent implements OnInit {

    @Input() name: string;

    @Input() isRootClass:boolean=true;

    @Input() title: string;

    @Input() type: string="text";

    @HostBinding('class.col-md-12') colmd12: boolean;

    @Input() formInfo: FormGroup;

    @Input() dataList:Array<{key:string,value:string}>=[];

    @Input() datevalue:Date=new Date();

    @ContentChildren(ValidatorComponent) validatorList: QueryList<ValidatorComponent>;

    constructor() {
    }

    onSelect(date: Date) {
        this.formInfo.get(this.name).setValue(date.toString());
    }

    ngOnInit() {
        //用于设置是否显示组件样式
        this.colmd12 = this.isRootClass; 
    }

    ngAfterContentInit() {
       this.validatorList.forEach(val=>{
           val.formInfo=this.formInfo;
           val.name=this.name;
       })
    }
}



