import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdvertService, Advert } from '../shared'

@Component({
    selector: 'admin-add-advert',
    templateUrl: 'addAdvert.html',
    providers:[AdvertService]
})

export class AddAdvertComponent implements OnInit {

    advertForm: FormGroup;

    typeList:Array<{key:string,value:string}>;

    constructor(private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private advertService: AdvertService) {
            this.typeList=[{key:"1",value:"大厅广告"},{key:"2",value:"活动广告"}];
            this.createForm()
        }

    ngOnInit() { }

    createForm(){
        this.advertForm = this.fb.group({
            title: ['', Validators.required,Validators.minLength(2), Validators.maxLength(62)],
            type: ['', Validators.required],
            imageSrc: ['', Validators.required],
            declare: [''],
            isValid: [true],
            startDate: ['', Validators.required],
            endDate: ['', Validators.required],
        });
    }

    onSubmit(){

    }
}