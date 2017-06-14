import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
@Component({
    selector: 'user-add',
    templateUrl: 'addUser.html'
})

export class AddUserComponent implements OnInit {

    userForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.createForm();
    }

    ngOnInit() { }

    createForm() {
        this.userForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(12)]],
            email: ['user@user.com', [Validators.required, Validators.email]],
            pwdList: new FormGroup({
                password: new FormControl('', [Validators.required, Validators.minLength(6)]),
                passwordConfirm: new FormControl(''),
            }, this.pwdMatch)
        });
    }

    pwdMatch(g: FormGroup) {
        let password = g.get('password').value; 
        let passwordConfirm = g.get('passwordConfirm').value;
        if (password != passwordConfirm) {
            g.get('passwordConfirm').setErrors({ MatchPassword: true })
        } else {
            return null;
        }
    }
}