import { Injectable, Inject } from '@angular/core';
import { Role } from './role.model';

@Injectable()
export class RoleService {

    Parse: ParserServer;

    constructor( @Inject("parseManager") parse) {
        this.Parse = parse;
    }

    public addInfo(role: Role): Promise<boolean> {
        //添加
        if (role.id == undefined || role.id == "") {
            let promise = new Promise<boolean>((resolve, reject) => {
                var roleACL = new this.Parse.Parse.ACL();
                roleACL.setPublicReadAccess(true);
                var roleinfo = new this.Parse.Parse.Role(role.name, roleACL);
                roleinfo.set("roleName", role.roleName);
                roleinfo.set("desc", role.desc);
                roleinfo.set("isValid", role.isValid);
                roleinfo.save();
                resolve(true);
            });
            return promise;
        }  
        
        //修改信息
        let promise = new Promise<boolean>((resolve, reject) => {
            this.Parse.Parse.Cloud.run('updateRole', {
                objectId: role.id,
                roleName: role.roleName,
                desc: role.desc,
                isValid: role.isValid
            }).then(result => resolve(result));
        });
        return promise;
    }

    public getInfo(id: any): Promise<Role> {
        let promise = this.Parse.getInfo(id, "Role");
        return promise;
    }

    public delInfo(id: string): Promise<boolean> {
        let promise = new Promise<boolean>((resolve, reject) => {
            this.Parse.Parse.Cloud.run('deleteRole', { objectId: id }).then(
                (result) => { resolve(result); }
            );
        });
        return promise;
    }
}