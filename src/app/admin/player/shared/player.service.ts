import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Player, CardLog } from './player.model';

@Injectable()
export class PlayerService {

	api: CommonApi;

	parseServer: ParserServer;

	constructor( @Inject("commonApi") commonApi, @Inject("parseManager") parse) {
		this.api = commonApi;
		this.parseServer = parse;
	}

	getList(pageIndex: number, pageSize: number): Promise<Array<Player>> {
		let promise = new Promise((resolve, reject) => {
			this.parseServer.Parse.Cloud.run(this.api.GMAPI,
				{ pathname: this.api.USER_LIST, query: "page=" + pageIndex + "&pageSize=" + pageSize })
				.then(result => {
					let info = JSON.parse(result);
					if (info.error_code != 0) resolve(false);
					let playList: Array<Player> = new Array<Player>();

					for (var i = 0; i < info.result.data.length; i++) {
						let player = new Player();
						Object.assign(player, info.result.data[i]);
						player.name = player.name.length > 10 ?
							player.name.substring(0, 10) + "..." : player.name;
						playList[i] = player;
					}

					resolve(playList);
				})
		});

		return promise;
	}

	getCount(id: string = ""): Promise<number> {
		let promise = new Promise((resole, reject) => {
			this.parseServer.Parse.Cloud.run(this.api.GMAPI,
				{ pathname: this.api.USER_TOTAL, query: "" })
				.then(result => {
					let info = JSON.parse(result);
					if (info.error_code != 0) resole(false);
					resole(info.result.num);
				})
		})
		return promise;
	}

	getInfo(id: string): Promise<Player> {
		let promise = new Promise((resole, reject) => {
			this.parseServer.Parse.Cloud.run(this.api.GMAPI,
				{ pathname: this.api.USER_INFO, query: "userId=" + id })
				.then(result => {
					let info = JSON.parse(result);
					if (info.error_code != 0) resole(false);
					var player = new Player();
					Object.assign(player, info.result);
					resole(player);
				})
		});
		return promise;
	}

	upInfo(id: string, card: number, username: string): Promise<boolean> {
		let promise = new Promise((resolve, reject) => {
			if (card <= 0) { resolve(false); return; }

			//当前操作的用户
			let currentUserCard = (-(card)); //减自己的房卡所以为负
			let currentUser = this.parseServer.Parse.User.current();
			let currentId = currentUser.id;
			let currentUserName = currentUser.get("username");

			//给用户添加房卡
			this.parseServer.Parse.Cloud.run(this.api.GMAPI,
				{ pathname: this.api.CARD_CHANGE, query: "userId=" + id + "&change=" + card })
				.then(result => {
					let info = JSON.parse(result);
					if (info.error_code == 0) {
						//添加给用户添房卡日志
						let cardLog = this.setCardLog(currentUserName, currentId, "添房卡", 
							card, 2, username, id.toString());
						this.parseServer.add(cardLog);
						resolve(info.error_code == 0);
					}
			});

			//同时自己的房卡减少
			this.parseServer.Parse.Cloud.run('updateUserCard', { objectId: currentId, card: currentUserCard })
				.then((result) => {
					//添加自己的减房卡日志
					let cardLog = this.setCardLog(currentUserName, currentId, "减房卡", 
						currentUserCard, 1, currentUserName, currentId);
					this.parseServer.add(cardLog);
					resolve(true);
			});

		});

		return promise;
	}

	//添加日志 当前操作用户给玩家添加了card 张房卡
	setCardLog(currentUserName: string, currentId: string, type: string, card: number,
		userType: number, targetName: string, targetId: string): any {
		var cardLog = this.parseServer.setParseObj("CardLog");
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
}