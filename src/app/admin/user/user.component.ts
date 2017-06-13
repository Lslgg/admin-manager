import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserService } from './shared/';

@Component({
    selector: 'admin-user',
    templateUrl: 'user.html',
    providers: [UserService]
})

export class UserComponent implements OnInit {

    constructor(private router: Router,
        private userService: UserService) {

    }

    ngOnInit() { }

    onDelete(id:string){
        this.userService.delUser(id).then(
            success=> alert("删除成功!"));
    }

    onAdd(){
        this.router.navigate(['../admin/addUser']);
    }
}