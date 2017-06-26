import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Player, CardLog } from './player.model';

@Injectable()
export class PlayerService {

	api: CommonApi;

	parseServer: ParserServer;

	constructor(@Inject("commonApi") commonApi,@Inject("parseManager") parse) {
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
						player.name=player.name.length>10?
							player.name.substring(0,10)+"...":player.name;
						playList[i] = player;
					}

					resolve(playList);
				})
		});

		return promise;
	}

	getCount(id:string=""): Promise<number> {
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
					var player=new Player();
					Object.assign(player, info.result);
					resole(player);
				})
		});
		return promise;
	}

	upInfo(id: string, card: number, username: string): Promise<Player> {
		let promise = new Promise((resolve, reject) => {
			if (card <= 0) { resolve(false); return; }
			let currentUserCard = (-(card));
			let currentUser = this.parseServer.Parse.User.current();
			let currentId = currentUser.id;
			let currentUserName = currentUser.get("username");

			this.parseServer.Parse.Cloud.run(this.api.GMAPI,
				{ pathname: this.api.CARD_CHANGE, query: "userId=" + id + "&change=" + card })
				.then(result => {
					let info = JSON.parse(result);
					resolve(info.error_code == 0);
				});
		});

		return promise;
	}
}