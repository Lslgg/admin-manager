import { Injectable, Inject } from '@angular/core';

@Injectable()
export class PayLogService {

    api: CommonApi;

    Parse: ParserServer;

    constructor(@Inject("commonApi") commonHttp, @Inject("parseManager") parse) {
        this.api = commonHttp;
        this.Parse = parse.Parse;
    }

    getStatstic(): Promise<any> {
        console.log(this.api.GM_STATSTIC);
        
		let promise = new Promise<any>((resole, reject) => {
			this.Parse.Parse.Cloud.run(this.api.GMAPI,
				{ pathname: this.api.GM_STATSTIC, query: "" })
				.then(result => {
                    let info = JSON.parse(result);
                    console.log(info);
                    if (info.error_code != 0) resole("0");
					resole(info.result.news);
				})
		});
		return promise;
    }
    
    getStatstic_card(): Promise<any> {
		let promise = new Promise<any>((resole, reject) => {
			this.Parse.Parse.Cloud.run(this.api.GMAPI,
				{ pathname: this.api.GM_STATSTIC_CARD, query: "" })
				.then(result => {
                    console.log(result);
					let info = JSON.parse(result);
					if (info.error_code != 0) resole("0");
					resole(info.result.news);
				})
		});
		return promise;
	}
}