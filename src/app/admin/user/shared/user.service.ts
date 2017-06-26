import { Injectable, Inject } from '@angular/core';
import { User } from './user.model'

@Injectable()
export class UserService {

    Parse: ParserServer;

    constructor( @Inject("parseManager") parse) {
        this.Parse = parse;
    }

    addUser(user: User): Promise<boolean> {
        let parseUser = this.setUser(user);
        let promise = new Promise<boolean>((resolve, reject) => {
            //保存用户 {useMasterKey: true}
            parseUser.save(null,{
                success: (userInfo) => {
                    //根据用户角色id保存用户角色关系
                    console.log(userInfo);
                    this.getRoleInfo(user.roleId).then(role => {
                        role.getUsers().add(userInfo);
                        role.save();
                        resolve(true);
                    });
                },
                error: (user, error) => {
                    console.log(error);
                    reject(false);
                }
            });
        });
        return promise;
    }

    updateUser(user: User, oldRoleId: string): Promise<boolean> {
        let promise = new Promise<boolean>((resolve, reject) => {
            let info = {
                objectId: user.id,
                username: user.username,
                roleId: user.roleId,
                isValid: user.isValid
            };
            this.Parse.Parse.Cloud.run('updateUser', info).then((result) => {
                if (user.roleId == oldRoleId) {
                    resolve(true);
                    return;
                }
                //修改用户角色关系
                this.getUserPrimary(user.id).then(userInfo => {
                    let roleId = userInfo["attributes"]["roleId"];
                    this.getRoleInfo(roleId).then(val => {//添加新的角色
                        val.getUsers().add(userInfo);
                        val.save();
                        this.getUserPrimary(user.id).then(odlUserInfo => {//删除旧的角色
                            this.getRoleInfo(oldRoleId).then(oldVal => {
                                oldVal.getUsers().remove(odlUserInfo);
                                oldVal.save();
                                resolve(true);
                            })
                        })
                    })
                });

            })
        });

        return promise;
    }

    getUserInfo(id: string): Promise<User> {
        let promise = this.Parse.getInfo<User>(id, this.Parse.Parse.User);
        return promise;
    }

    delUser(id: string): Promise<boolean> {
        let promise = new Promise<boolean>((resolve, reject) => {
            this.Parse.Parse.Cloud.run('deleteUser', { objectId: id }).then(
                (result) => { resolve(result); }
            );
        });
        return promise;
    }

    getCurrentUser(): User {
        var currentUser = this.Parse.Parse.User.current();
        let userInfo = new User();
        Object.assign(userInfo, currentUser['attributes']);
        userInfo.id = currentUser.id;
        return userInfo;
    }

    upUserPwd(id: string, username: string,
        password: string, newPassword): Promise<boolean> {
        let promise = new Promise<boolean>((resolve, reject) => {
            this.Parse.Parse.User.logIn(username, password, {
                success: function (user) {
                    resolve(true);
                },
                error: function (user, error) {
                    console.log(error);
                    return reject(false);
                }
            });

        });

        promise.then(istrue => {
            if (istrue) { return this.upPwd(id, newPassword); }
        }).catch(error => { console.log(error); })

        return promise;
    }

    upUserInfo(id: string, email: string,
        phone: string, address: string): Promise<boolean> {
        let promise = new Promise<boolean>((resolve, reject) => {
            this.Parse.Parse.Cloud.run('updateUserInfo',
                {
                    objectId: id,
                    email: email,
                    phone: phone,
                    address: address
                }).then(
                (result) => { resolve(true); }
                );
        });
        return promise;
    }

    /**
    * 查找返回原数据库对象
    */
    getRoleInfo(id: string): Promise<any> {
        let promise = new Promise<any>((resolve, reject) => {
            var query = new this.Parse.Parse.Query(this.Parse.Parse.Role);
            query.equalTo('objectId', id);
            query.get(id, {
                success: (roule: any) => {
                    resolve(roule);
                },
                error: (error) => {
                    reject(false);
                }
            })
        });
        return promise;
    }

    getRoleList(): Promise<Array<{ id: string, roleName: string }>> {
        var query = this.Parse.setQuery("Role");
        let promise = this.Parse.getList<{ id: string, roleName: string }>(query);
        return promise;
    }

    /**
     * 查找返回原数据库对象
     */
    getUserPrimary(id: string): Promise<User> {
        var query = new this.Parse.Parse.Query(this.Parse.Parse.User);
        let promise = new Promise<User>((resolve, reject) => {
            query.get(id, {
                success: (user: User) => {
                    resolve(user);
                },
                error: (error) => { reject(null) }
            })
        });
        return promise;
    }

    private upPwd(id: string, password: string): Promise<boolean> {
        let promise = new Promise<boolean>((resolve, reject) => {
            this.Parse.Parse.Cloud.run('updateUserPwd', { objectId: id, password: password }).then(
                (result) => { resolve(true); }
            );
        });
        return promise;
    }

    private setUser(userInfo: User) {
        var user = new this.Parse.Parse.User();
        user.set("username", userInfo.username);
        user.set("password", userInfo.passWord);
        user.set("roleId", userInfo.roleId);
        user.set("card", 0);
        user.set("email", userInfo.username + "@qq.com");
        user.set("phone", "");
        user.set("address", "");
        user.set("lastLoginIp", "127.0.0.1");
        user.set("lastLoginTime", Date.now());
        user.set("isDel", true);
        user.set("isValid", true);
        return user;
    }
}