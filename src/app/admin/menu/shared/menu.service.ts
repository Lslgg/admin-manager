import { Injectable, Inject } from '@angular/core';
import { Menu } from './menu.modle';

@Injectable()
export class MenuService {

    Parse: ParserServer;

    tableName: string = "Menu";

    constructor(@Inject("parseManager") parse) {
        this.Parse = parse;
        
    }

    //添加菜单
    public add(menu: Menu): Promise<boolean> {
        var dbMenu = this.Parse.setParseObj(this.tableName);
        var menuInfo = this.setInfo(menu, dbMenu);
        let promise = this.Parse.add(menuInfo);
        return promise;
    }
    
    //删除菜单
    public delete(id:string):Promise<boolean>{
        let promise=this.Parse.delete(id,this.tableName);
        return promise;
    }

    //查找菜单
    public getInfo(id: string): Promise<Menu> {
        let promise = this.Parse.getInfo<Menu>(id, this.tableName);
        return promise;
    }

    //查找子菜单
    public getListByPid(pid: string):Promise<Array<Menu>> {
        let query = this.Parse.setQuery(this.tableName);
        query.equalTo("pid",pid);
        let promise=this.Parse.getList<Menu>(query);
        return promise;
    }
    
    //查找所有菜单
    public getList():Promise<Array<Menu>> {
        let query = this.Parse.setQuery(this.tableName);
        let promise=this.Parse.getList<Menu>(query);
        return promise;
    }

    private setInfo(menu: Menu, dbInfo: any) {
        dbInfo.set("id", menu.id);
        dbInfo.set("title", menu.title);
        dbInfo.set("code", menu.code);
        dbInfo.set("url", menu.url);
        dbInfo.set("pid", menu.pid);
        dbInfo.set("isLeaf",menu.isLeaf);
        dbInfo.set("isValid", menu.isValid);
        return dbInfo;
    }


}