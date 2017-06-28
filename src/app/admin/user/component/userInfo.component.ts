import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../shared/user.service';
import { User } from '../shared';

@Component({
    selector: 'admin-user-info',
    templateUrl: 'userInfo.html',
    providers: [UserService]
})

export class UserInfoComponent implements OnInit {

    userForm: FormGroup;

    user: User;

    constructor(private fb: FormBuilder,
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router) {
        //不能用session的用户来赋值修改，会有修改后再次查看还是没修改
        var id = this.userService.getCurrentUser().id;
        this.userService.getUserInfo(id).then(val => {
            this.user=val;
            this.userForm.get("username").setValue(this.user.username);
            this.userForm.get("email").setValue(this.user.email);
            this.userForm.get("phone").setValue(this.user.phone);
            this.userForm.get("address").setValue(this.user.address); 
        })
        this.createForm();
    }

    ngOnInit() { }

    createForm() {
        this.userForm = this.fb.group({
            username: [{ value: '', disabled: true }, [Validators.required]],
            email: [''],
            phone: [''],
            address: [''],
        });
    }


    onSubmit(info: { email: string, phone: string, address: string }) {
        var { email, phone, address } = info;
        this.userService.upUserInfo(this.user.id, email, phone, address).then(success => {
            alert(success ? "修改成功！" : "修改失败！");
        })
    }
}