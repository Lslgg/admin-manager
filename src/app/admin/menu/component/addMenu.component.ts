import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Menu, MenuService } from "../shared";
@Component({
    selector: 'admin-addMenu',
    templateUrl: 'addMenu.html',
    providers: [MenuService]
})

export class AddMenuComponent implements OnInit {

    menuForm: FormGroup;

    menu: Menu = new Menu();

    constructor(private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private menuService: MenuService) {
        this.createForm();//创建表单
        let id = this.route.snapshot.params['id'];
        let type = this.route.snapshot.params['type'];
        if (type == 1) { //设置添加时表单显示信息
            this.setAddMenu(id);
        }else{ //设置修改时表单显示信息
            this.setUpdateMenu(id);
        }
    }

    ngOnInit() { }

    createForm() {
        this.menuForm = this.fb.group({
            id:'',
            pid: '0',
            parentTitle: [{ value: '根目录', disabled: true }],
            title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(24)]],
            code: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(24)]],
            url: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(24)]],
            isLeaf: true,
            isValid: true
        });
    }

    setAddMenu(id: string) {
        this.menuForm.get("pid").setValue("0");
        this.menuForm.get("parentTitle").setValue("根目录");
        if (id != "0") {
            this.menuService.getInfo(id).then(info => {
                this.menuForm.get("pid").setValue(info.id);
                this.menuForm.get("parentTitle").setValue(info.title);
            })
        }
    }

    setUpdateMenu(id: string) {
        this.menuService.getInfo(id).then(info => {
            this.menuForm.get("pid").setValue("0");
            this.menuForm.get("id").setValue(info.id);
            this.menuForm.get("parentTitle").setValue("根目录");
            if (info.pid != "0") {
                this.menuService.getInfo(info.pid).then(pInfo => {
                    this.menuForm.get("pid").setValue(pInfo.id);
                    this.menuForm.get("parentTitle").setValue(pInfo.title);
                })
            }
            this.menuForm.get("title").setValue(info.title);
            this.menuForm.get("code").setValue(info.code);
            this.menuForm.get("url").setValue(info.url);
            this.menuForm.get("isLeaf").setValue(info.isLeaf);
            this.menuForm.get("isValid").setValue(info.isValid);
        })
    }

    onSubmit(formInfo: object) {
        this.setMenu(formInfo);
        this.menuService.add(this.menu).then(
            success=>{
                alert(success?"操作成功！":"操作失败！");
                this.router.navigate(['/admin/menu']);
        })
    }

    private setMenu(formInfo: object) {
        this.menu.id=formInfo["id"];
        this.menu.pid = formInfo["pid"];
        this.menu.title = formInfo["title"];
        this.menu.code = formInfo["code"];
        this.menu.url = formInfo["url"];
        this.menu.isValid = formInfo["isValid"];
        this.menu.isLeaf = formInfo["isLeaf"];
    }
}