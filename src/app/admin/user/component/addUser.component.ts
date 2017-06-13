import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
            username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
            email: ['', [Validators.required, Validators.email]],
        });
    }
}