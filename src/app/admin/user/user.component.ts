import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserService } from './shared/';

@Component({
    selector: 'admin-user',
    templateUrl: 'user.html',
    providers: [UserService]
})

export class UserComponent implements OnInit {

    roleList:Array<{}>=[];
    
    constructor(private router: Router,
        private userService: UserService) {
        //用户角色列表项
        this.userService.getRoleList().then(list => {
            list.forEach(val => {
                this.roleList.push({ key: val.id, value: val.roleName });
            })
        });
    }

    ngOnInit() { }

    onDelete(id:string){
        this.userService.delUser(id).then(
            success=> alert("删除成功!"));
    }

    onAdd(){
        this.router.navigate(['../admin/addUser']);
    }

    onSetInfo(info:IdType){
        let {id,type}=info;
        if(type=="username"){
            this.router.navigate(['../admin/addUser', id]);
        }
    }
}