import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SystemService {

	api: CommonApi;

	Parse: ParserServer;

	constructor( @Inject("commonApi") commonHttp, @Inject("parseManager") parse) {
		this.api = commonHttp;
		this.Parse = parse.Parse;
	}

	getNews(): Promise<string> {
		let promise = new Promise<string>((resole, reject) => {
			this.Parse.Parse.Cloud.run(this.api.GMAPI,
				{ pathname: this.api.GM_NEWS, query: "" })
				.then(result => {
					let info = JSON.parse(result);
					if (info.error_code != 0) resole("0");
					resole(info.result.news);
				})
		});
		return promise;
	}

	getNotice(): Promise<string> {
		let promise = new Promise<string>((resole, reject) => {
			this.Parse.Parse.Cloud.run(this.api.GMAPI,
				{ pathname: this.api.GM_NOTICE, query: "" })
				.then(result => {
					let info = JSON.parse(result);
					if (info.error_code != 0) resole("0");
					resole(info.result.notice);
				})
		});
		return promise;
	}

	getTip(): Promise<string> {
		let promise = new Promise<string>((resole, reject) => {
			this.Parse.Parse.Cloud.run(this.api.GMAPI,
				{ pathname: this.api.GM_TIP, query: "" })
				.then(result => {
					let info = JSON.parse(result);
					if (info.error_code != 0) resole("0");
					resole(info.result.tip);
				})
		});
		return promise;
	}

	getVersion(): Promise<string> {
		let promise = new Promise<string>((resole, reject) => {
			this.Parse.Parse.Cloud.run(this.api.GMAPI,
				{ pathname: this.api.GM_VERSION, query: "" })
				.then(result => {
					let info = JSON.parse(result);
					if (info.error_code != 0) resole("0");
					resole(info.result);
				})
		});
		return promise;
	}

	getIfFree(): Promise<boolean> {
		let promise = new Promise<boolean>((resole, reject) => {
			this.Parse.Parse.Cloud.run(this.api.GMAPI,
				{ pathname: this.api.CARD_IS_FREE, query: "" })
				.then(result => {
					let info = JSON.parse(result);
					if (info.error_code != 0) resole(false);
					resole(info.result.flag);
				})
		});
		return promise;
	}

	setNews(news: string): Promise<boolean> {
		let promise = new Promise<boolean> ((resole, reject) => {
			this.Parse.Parse.Cloud.run(this.api.GMAPI,
				{ pathname: this.api.GM_SET_NEWS, query: "news=" + news })
				.then(result => {
					let info = JSON.parse(result);
					if (info.error_code != 0) resole(false);
					resole(true);
				})
		});
		return promise;
	}

	setNotice(notice: string): Promise<boolean> {
		let promise = new Promise<boolean> ((resole, reject) => {
			this.Parse.Parse.Cloud.run(this.api.GMAPI,
				{ pathname: this.api.GM_SET_NOTICE, query: "notice=" + notice })
				.then(result => {
					let info = JSON.parse(result);
					if (info.error_code != 0) resole(false);
					resole(true);
				})
		});
		return promise;
	}

	setTip(tip: string): Promise<boolean> {
		let promise = new Promise<boolean> ((resole, reject) => {
			this.Parse.Parse.Cloud.run(this.api.GMAPI,
				{ pathname: this.api.GM_SET_TIP, query: "tip=" + tip })
				.then(result => {
					let info = JSON.parse(result);
					if (info.error_code != 0) resole(false);
					resole(true);
				})
		});
		return promise;
	}

	setVersion(iosUrl: string, iosVersion: string,
		androidUrl: string, androidVersion): Promise<boolean> {
		let promise = new Promise<boolean>((resole, reject) => {
			let query = "iosUrl=" + iosUrl + "&iosVersion=" + iosVersion + "&androidUrl=" + androidUrl + "&androidVersion=" + androidVersion;
			this.Parse.Parse.Cloud.run(this.api.GMAPI,
				{ pathname: this.api.GM_SET_VERSION, query: query })
				.then(result => {
					let info = JSON.parse(result);
					if (info.error_code != 0) resole(false);
					resole(true);
				})
		});
		return promise;
	}

	setIfFree(isCheck: boolean): Promise<boolean> {
		let promise = new Promise<boolean>((resole, reject) => {
			this.Parse.Parse.Cloud.run(this.api.GMAPI,
				{ pathname: this.api.CARD_FREE, query: "flag=" + isCheck })
				.then(result => {
					let info = JSON.parse(result);
					resole(info.error_code == 0);
				})
		});
		return promise;
	}
}