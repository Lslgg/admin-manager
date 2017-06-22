import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RoleService,Role } from '../shared';

@Component({
    selector: 'admin-addRole',
    templateUrl: 'addRole.html',
    providers: [RoleService]
})

export class AddRoleComponent implements OnInit {

    roleForm: FormGroup;

    role: Role = new Role();

    constructor(
        private fb: FormBuilder,
        private roleService: RoleService,
        private route: ActivatedRoute,
        private router: Router) {
        let id = this.route.snapshot.params['id'];
        this.createForm(this.role);
        this.roleService.getInfo(id).then(val => {
            this.role = val;
            this.roleForm.get("id").setValue(this.role.id);
            this.roleForm.get("roleName").setValue(this.role.roleName);
            this.roleForm.get("name").setValue(this.role.name);
            this.roleForm.get("desc").setValue(this.role.desc);
            this.roleForm.get("isValid").setValue(this.role.isValid);
        });
    }

    ngOnInit() { }

    createForm(role: Role) {
        let form = {
            id: this.role.id,
            roleName: [this.role.roleName, [Validators.required, Validators.maxLength(32)]],
            name: [this.role.name, [Validators.required, Validators.maxLength(32)]],
            desc: this.role.desc,
            isValid: this.role.isValid
        };
        this.roleForm = this.fb.group(form);
    }

    onSubmit(formInfo: any) {
        Object.assign(this.role, formInfo);
        this.roleService.addInfo(this.role).then(success => {
            alert(success ? "保存成功！" : "保存失败!");
            this.router.navigate(['../admin/role']);
        });
    }
}