import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from './shared';

@Component({
    selector: 'admi-role',
    templateUrl: 'role.html',
    providers: [RoleService]
})

export class RoleComponent implements OnInit {

    constructor(private router: Router, private roleService: RoleService) { }

    ngOnInit() { }

    onAdd() {
        this.router.navigate(['../admin/addRole']);
    }

    onDelete(id: string) {
        this.roleService.delInfo(id).then(
            success => alert("删除成功!"));
    }

    onSetInfo(info: object) {
        let id = info["id"];
        let type = info["type"];
        if (type == "roleName") {
            this.router.navigate(['../admin/addRole', id]);
        }
    }
}