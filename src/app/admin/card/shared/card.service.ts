import { Injectable, Inject } from '@angular/core';

@Injectable()
export class CardService {

    ps: ParserServer;

    constructor( @Inject("parseManager") parse) {
        this.ps = parse;
    }

    getRoleList(): Promise<Array<{ id: string, roleName: string }>> {
        let role = this.ps.setQuery("Role");
        let promise = this.ps.getList(role);
        return promise;
    }

    getUserCard(id: string): Promise<{ id: string, username: string, card: number }> {
        let promise = this.ps.getInfo(id, "User");
        return promise;
    }

    deleteAll(ids: Array<string>):Promise<boolean> {
        var conditions: ConditionList = [];
        conditions.push({ field: "objectId", value: ids, condition: "in" });
        let promise=this.ps.deleteAll("CardLog",conditions);
        return promise;
    }

    upUserCard(id: string, card: number, username: string): Promise<boolean> {

        let promise = new Promise<boolean>((resolve, reject) => {

            //当前后台操作着用户信息
            let currentUserCard = (-(card)); //给自己减房卡
            let currentUser = this.ps.Parse.User.current();
            let currentId = currentUser.id;
            let currentUserName = currentUser.get("username");

            //修改用户的房卡
            this.ps.Parse.Cloud.run('updateUserCard', { objectId: id, card: card }).then(
                (result) => {
                    //添加修改用户房卡日志
                    let carType = card > 0 ? "添房卡" : "减房卡";
                    let cardLog = this.setCardLog(currentUserName, currentId, carType, card, 2, username, id.toString());
                    this.ps.add(cardLog).then(success => {
                        resolve(result);
                    })
                }
            );

            //修改自己的房卡 admin 不用减少自己的房卡
            this.ps.Parse.Cloud.run('updateUserCard', { objectId: currentId, card: currentUserCard })
                .then((result) => {
                    //添加修改用户房卡日志
                    let carType = currentUserCard > 0 ? "添房卡" : "减房卡";
                    let cardLog = this.setCardLog(currentUserName, currentId, carType, currentUserCard, 2, currentUserName, currentId.toString());
                    this.ps.add(cardLog).then(success => {
                        resolve(result);
                    })
                });

        });

        return promise;
    }

    //添加日志 当前操作用户给玩家添加了card 张房卡
    setCardLog(currentUserName: string, currentId: string, type: string, card: number,
        userType: number, targetName: string, targetId: string): any {
        var cardLog = this.ps.setParseObj("CardLog");
        cardLog.set("userId", currentId);
        cardLog.set("userName", currentUserName);
        cardLog.set("targetId", targetId);
        cardLog.set("targetName", targetName);
        cardLog.set("card", card);
        cardLog.set("type", type);
        var desc = currentUserName + "给" + targetName + type + card + "张";
        cardLog.set("desc", desc);
        cardLog.set("userType", userType);
        return cardLog;
    }

    /**
     * 是否可以添加房卡
     * @param card 
     */
    isCanAddCard(card: number): boolean {
        var currentUser = this.ps.Parse.User.current();
        let nowUserCard = currentUser.get("card");
        return card > nowUserCard
    }
}