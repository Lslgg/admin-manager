import { Injectable, Inject } from '@angular/core';
import { NavMenu, Power, RoleInfo, RolePower } from './power.model';

@Injectable()
export class PowerService {

    Parse: ParserServer;

    tableName: string = "power"

    constructor(@Inject("parseManager") parse) {
        this.Parse = parse;
    }

    //查找权限表
    getInfo(roleId: string): Promise<any> {
        return null;
    }

    //修改或保存权限表
    saveInfo(powers: Array<Power>): Promise<boolean> {
        var powerList = [];
        for (var i = 0; i < powers.length; i++) {
            var obj = powers[i];
            powerList.push(this.setInfo(obj));
        }

        var promise = this.Parse.addAll(powerList);
        return promise;
    }

    //修改或保存权限表
    saveRolePower(powers: Array<RolePower>): Promise<boolean> {
        var powerList = [];
        for (var i = 0; i < powers.length; i++) {
            var obj = powers[i];
            powerList.push(this.setRolePower(obj));
        }

        var promise = this.Parse.addAll(powerList);
        return promise;
    }

    getMenuList(): Promise<Array<NavMenu>> {
        let table = this.Parse.Parse.Object.extend("Menu");
        let query = new this.Parse.Parse.Query(table);
        query.equalTo("isLeaf", true);
        let promise = this.Parse.getList<NavMenu>(query, NavMenu);
        return promise;
    }

    getRolePowerList(roleId:string): Promise<Array<RolePower>> {
        let table = this.Parse.Parse.Object.extend("RolePower");
        let query = new this.Parse.Parse.Query(table);
        query.equalTo("roleId", roleId);
        let promise = this.Parse.getList<RolePower>(query, RolePower);
        return promise;
    }

    getPowerList(): Promise<Array<Power>> {
        let table = this.Parse.Parse.Object.extend(this.tableName);
        let query = new this.Parse.Parse.Query(table);
        let promise = this.Parse.getList<Power>(query,Power);
        return promise;
    }

    getRoleList(): Promise<Array<RoleInfo>> {
        let table = this.Parse.Parse.Object.extend(this.Parse.Parse.Role);
        let query = new this.Parse.Parse.Query(table);
        let promise = this.Parse.getList<RoleInfo>(query);
        return promise;
    }

    delete(id: string): Promise<boolean> {
        let promise = this.Parse.delete(id, this.tableName);
        return promise;
    }

    deleteRolePower(id: string): Promise<boolean> {
        let promise = this.Parse.delete(id, "RolePower");
        return promise;
    }

    private setInfo(power: Power) {
        var DBInfo = this.Parse.Parse.Object.extend(this.tableName);
        var dbInfo = new DBInfo();
        //如果id为一样的话，不管有多少条数据都会一样
        if (power.id != "") dbInfo.set("id", power.id);
        dbInfo.set("title", power.title);
        dbInfo.set("code", power.code);
        dbInfo.set("url", power.url);
        dbInfo.set("type", power.type);
        dbInfo.set("explain", power.explain);
        dbInfo.set("isValid", power.isValid);
        dbInfo.set("menuId", power.menuId);
        dbInfo.set("operation", power.operation);
        return dbInfo;
    }

    private setRolePower(power: RolePower) {
        var DBInfo = this.Parse.Parse.Object.extend("RolePower");
        var dbInfo = new DBInfo();
        //如果id为一样的话，不管有多少条数据都会一样
        if (power.id != "") dbInfo.set("id", power.id);
        dbInfo.set("title", power.title);
        dbInfo.set("code", power.code);
        dbInfo.set("url", power.url);
        dbInfo.set("type", power.type);
        dbInfo.set("explain", power.explain);
        dbInfo.set("isValid", power.isValid);
        dbInfo.set("menuId", power.menuId);
        dbInfo.set("roleId", power.roleId);
        dbInfo.set("operation", power.operation);
        return dbInfo;
    }

    public operationMap():Array<string>{
        var operatinMap=[];
        operatinMap["SHOW"] = "查看";
        operatinMap["ADD"] = "添加";
        operatinMap["UPDATE"] = "修改";
        operatinMap["DELETE"] = "删除";
        operatinMap["CHECK"] = "审核";
        return operatinMap;
    }
}