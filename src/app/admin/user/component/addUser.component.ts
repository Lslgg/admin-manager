import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../shared/user.service';
import { User } from '../shared/user.modle';


@Component({
    selector: 'admin-addUser',
    templateUrl: 'addUser.html',
    providers: [UserService]
})

export class AddUserComponent implements OnInit {

    userForm: FormGroup;

    roleList: Array<{ key: string, value: string }> = [];

    user: User = new User();

    oldRoleId: string;

    constructor(private fb: FormBuilder,
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router) {
        this.createForm();

        //用户角色列表项
        this.userService.getRoleList().then(list => {
            list.forEach(val => {
                this.roleList.push({ key: val.id, value: val.roleName });
            })
        });

        let id = this.route.snapshot.params['id'];
        if (id != undefined) {
            this.userService.getUserInfo(id).then(val => {
                this.user = val;
                this.oldRoleId = val.roleId;
                this.userForm.get("username").setValue(this.user.username);
                this.userForm.get("roles").setValue(this.user.roleId);
                this.userForm.get("pwdList").get("isValid").setValue(this.user.isValid);
            })
        }

    }

    ngOnInit() { }

    createForm() {
        this.userForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(12)]],
            roles: ['', Validators.required],
            pwdList: new FormGroup({
                password: new FormControl('123456', [Validators.required, Validators.minLength(6)]),
                passwordConfirm: new FormControl('123456'),
                isValid: new FormControl(true)
            }, this.pwdMatch),
        });
    }

    onSubmit(formInfo: object) {
        this.setUser(formInfo);
        if (this.user.id) {
            this.userService.updateUser(this.user, this.oldRoleId)
                .then(success => {
                    alert(success ? "修改成功！" : "修改失败!");
                    this.router.navigate(['../admin/user']);
                });
            return;
        }
        
        this.userService.addUser(this.user)
            .then(success => {
                alert(success ? "保存成功！" : "保存失败!");
                this.router.navigate(['../admin/user']);
            });
    }

    //密码验证
    private pwdMatch(g: FormGroup) {
        let password = g.get('password').value;
        let passwordConfirm = g.get('passwordConfirm').value;
        if (password != passwordConfirm) {
            g.get('passwordConfirm').setErrors({ MatchPassword: true })
        } else {
            return null;
        }
    }

    private setUser(formInfo: object) {
        this.user.username = formInfo["username"];
        this.user.email = formInfo["email"];
        this.user.roleId = formInfo["roles"];
        this.user.passWord = formInfo["pwdList"]["password"];
        this.user.isValid = formInfo["pwdList"]["isValid"];
    }
}