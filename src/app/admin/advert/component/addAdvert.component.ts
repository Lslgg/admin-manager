import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdvertService, Advert } from '../shared'

@Component({
    selector: 'admin-add-advert',
    templateUrl: 'addAdvert.html',
    providers: [AdvertService]
})

export class AddAdvertComponent implements OnInit {

    advertForm: FormGroup;

    typeList: Array<{ key: string, value: string }>;

    startDate: Date = new Date();

    endDate: Date = new Date();

    fileUrlList:Array<string>=new Array<string>();

    constructor(private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private advertService: AdvertService) {
        this.typeList = [{ key: "1", value: "大厅广告" }, { key: "2", value: "活动广告" }];
        this.createForm()
        let id = this.route.snapshot.params['id'];
        if (id) {
            this.advertService.getInfo(id).then(info => {
                delete info["createdAt"]; //删除不在表单的字段
                delete info["updatedAt"]; //于是setValue可以直接是对象
                this.startDate = info.startDate;
                this.endDate = info.endDate;
                if(info.imageSrc!=""){
                    //设置图片显示的路径，不同的服务器路径不一样
                    // info.imageSrc.split(",").forEach(fileName => {
                    //     this.fileUrlList.push(this.advertService.fileSrc+fileName);
                    // });
                    
                    this.fileUrlList=info.imageSrc.split(",");
                }
                this.advertForm.setValue(info);
            })
        }
    }

    ngOnInit() { }

    createForm() {
        var info = new Advert();
        this.advertForm = this.fb.group({
            id: [''],
            title: ['', Validators.required],
            type: ['', Validators.required],
            imageSrc: [''],
            declare: [''],
            startDate: [this.startDate],
            endDate: [this.endDate],
            isValid: [true],
        });
    }

    onSubmit(advert: Advert) {
        this.advertService.add(advert).then(success=>{
            alert(success?"操作成功！":"操作失败！");
            this.router.navigate(['../admin/advert']);
        })
    }
}