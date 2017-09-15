import { Injectable, Inject } from '@angular/core';
import { Dealer } from './dealer.model';

@Injectable()
export class DealerService {

	api: CommonApi;

	parseServer: ParserServer;

	constructor( @Inject("commonApi") commonApi, @Inject("parseManager") parse) {
		this.api = commonApi;
		this.parseServer = parse;
	}

	getList(pageIndex: number, pageSize: number, dealer:
		Dealer = new Dealer()): Promise<{ list: Array<Dealer>, count: number }> {
		let promise = new Promise<{ list: Array<Dealer>, count: number }>((resolve, reject) => {
			var queryStr=`page=${pageIndex}&pageIndex=${pageSize}&name=${dealer.Name}&code=${dealer.Code}`;
			this.parseServer.Parse.Cloud.run(this.api.GMAPI,
				{ pathname: this.api.DEALER_LIST, query: queryStr })
				.then(result => {

					let info = JSON.parse(result);
					let pageCount = info.result.totalPage * pageSize;
					if (info.error_code != 0) resolve(null);
					let dealerList: Array<Dealer> = new Array<Dealer>();
					for (var i = 0; i < info.result.data.length; i++) {
						dealerList.push(this.setDealer(info.result.data[i]))
					}

					resolve({ list: dealerList, count: pageCount });
				})
		});

		return promise;
	}

	getInfo(id: number): Promise<Dealer> {
		let promise = new Promise<Dealer>((resolve, reject) => {
			this.parseServer.Parse.Cloud.run(this.api.GMAPI,
				{ pathname: this.api.DEALER_GET_ID, query: "id=" + id })
				.then(result => {
					let info = JSON.parse(result);
					if (info.error_code != 0) resolve(null);
					let dealer = this.setDealer(info.result);
					resolve(dealer);
				})
		});

		return promise;
	}

	update(dealer: Dealer): Promise<boolean> {
		let promise = new Promise<boolean>((resolve, reject) => {
			var queryStr=`id=${dealer.Id}&name=${dealer.Name}&code=${dealer.Code}`;
			this.parseServer.Parse.Cloud.run(this.api.GMAPI,
				{ pathname: this.api.DEALER_UP, query: queryStr })
				.then(result => {
					console.log(result);
					let info = JSON.parse(result);
					if (info.error_code != 0) resolve(false);
					resolve(true);
				})
		});

		return promise;
	}

	addDealer(dealer: Dealer): Promise<boolean> {
		let promise = new Promise<boolean>((resolve, reject) => {
			var queryStr=`name=${dealer.Name}&code=${dealer.Code}`;
			this.parseServer.Parse.Cloud.run(this.api.GMAPI,
				{ pathname: this.api.DEALER_ADD, query: queryStr })
				.then(result => {
					let info = JSON.parse(result);
					console.log(info);
					if (info.error_code != 0) resolve(false);
					resolve(true);
				}).catch(err=>{
					reject(false);
				})
		});

		return promise;
	}

	setDealer(info: any): Dealer {
		let dealer = new Dealer();
		Object.assign(dealer, info);
		dealer.Name = dealer.Name.length > 10 ?
			dealer.Name.substring(0, 10) + "..." : dealer.Name;
		return dealer;
	}

}