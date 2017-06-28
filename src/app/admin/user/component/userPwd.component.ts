import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../shared/user.service';
import { User } from '../shared';

@Component({
    selector: 'admin-user-pwd',
    templateUrl: 'userPwd.html',
    providers: [UserService]
})

export class UserPwdComponent implements OnInit {

    userForm: FormGroup;

    user: User;
    constructor(private fb: FormBuilder,
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router) {
        this.user = this.userService.getCurrentUser();
        this.createForm();
    }

    ngOnInit() { }

    createForm() {
        this.userForm = this.fb.group({
            username: [{ value: this.user.username, disabled: true }, [Validators.required, Validators.minLength(5), Validators.maxLength(12)]],
            password: ['', [Validators.required]],
            pwdList: new FormGroup({
                password: new FormControl('', [Validators.required, Validators.minLength(6)]),
                passwordConfirm: new FormControl('')
            }, this.pwdMatch),
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

    onSubmit(info: object) {
        var password = info["password"];
        var newPassword = info["pwdList"]["password"];
        this.userService.upUserPwd(this.user.id, this.user.username,
            password, newPassword).then(value => {
                alert(value ? "密码修改成功！" : "密码修改失败！");
            }).catch((error) => {
                alert("操作失败！");
            });
    }
}
