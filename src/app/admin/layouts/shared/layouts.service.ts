import { Injectable, Inject } from '@angular/core';
import { NavMenu } from './layouts';

@Injectable()
export class LayoutsService {

    parseServer: ParserServer;

    tableName: string = "Menu"

    constructor( @Inject("parseManager") parse) {
        this.parseServer = parse;
    }

    public findAllMenu(): Promise<Array<NavMenu>> {

        let newPromise = new Promise<Array<NavMenu>>((reovle, reject) => {
            this.getRolrPowerList().then(list => {
                let query = this.parseServer.setQuery(this.tableName);
                let promise = this.parseServer.getList<NavMenu>(query);
                promise.then(menuList => {
                    var resultMenuList = Array<NavMenu>();
                    list.forEach(val => {
                        var menus = new Array<NavMenu>();
                        var newMenuList = this.getUserMenuList(val.menuId, menuList, menus);
                        newMenuList.forEach(menu => {
                            let isMenu=resultMenuList.filter(p=>p.id==menu.id);
                            if(isMenu.length<=0){
                                resultMenuList.push(menu);
                            }
                        });
                        reovle(resultMenuList);
                    });
                }).catch(error => reject([]));
            });
        })

        return newPromise;
    }

    public getRolrPowerList(): Promise<Array<{ menuId, title }>> {
        var currentUser = this.parseServer.Parse.User.current();
        let roleId = currentUser.get("roleId");
        var rolePower = this.parseServer.setQuery("RolePower");
        rolePower.equalTo("roleId", roleId);
        let promise = this.parseServer.getList<{ menuId, title }>(rolePower);
        let newPromise = new Promise<Array<{ menuId, title }>>((reovle, reject) => {
            promise.then(list => {
                var power = this.parseServer.setQuery("power");
                var menuidList = list.map(val => val.menuId);
                power.containedIn("objectId", menuidList);
                let promisList = this.parseServer.getList<{ menuId, title }>(power).then(list2 => {
                    reovle(list2)
                }).catch(error => {
                    reject([]);
                });
            })
        })

        return newPromise;
    }

    private getUserMenuList(id: string, menuList: Array<NavMenu>, newMenuList: Array<NavMenu>): Array<NavMenu> {
        let menus = menuList.filter(p => p.id == id);
        if (menus.length > 0) {
            newMenuList.push(menus[0]);
            let pid = menus[0].pid;
            this.getUserMenuList(pid, menuList, newMenuList);
        }
        return newMenuList;
    }

    public getCurrentUserInfo():{name:string,card:number}{
        var currentUser = this.parseServer.Parse.User.current();
        let name = currentUser.get("username");
        let card = currentUser.get("card");
        return {name,card};
    }
}