import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class IndexService {

    api: CommonApi;

    Parse: ParserServer;

    constructor( @Inject("commonApi") commonHttp: CommonApi, @Inject("parseManager") parse) {
        this.api = commonHttp;
        this.Parse = parse;
    }

    getTotalPlayer(): Promise<number> {
        let promise = new Promise((resole, reject) => {
            this.Parse.Parse.Cloud.run(this.api.GMAPI,
                { pathname: this.api.USER_TOTAL, query: "" })
                .then(result => {
                    let info = JSON.parse(result);
                    if (info.error_code != 0) resole(0);
                    resole(info.result.num);
                })
        });
        return promise;
    }

    getNewPlayer(): Promise<number> {
        let promise = new Promise((resole, reject) => {
            this.Parse.Parse.Cloud.run(this.api.GMAPI,
                { pathname: this.api.USER_NEW, query: "" })
                .then(result => {
                    let info = JSON.parse(result);
                    if (info.error_code != 0) resole(0);
                    resole(info.result.num);
                })
        });
        return promise;
    }

    getOnlinePlayer(): Promise<number> {
        let promise = new Promise((resole, reject) => {
            this.Parse.Parse.Cloud.run(this.api.GMAPI,
                { pathname: this.api.ONLINE_USER, query: "" })
                .then(result => {
                    let info = JSON.parse(result);
                    if (info.error_code != 0) resole(0);
                    resole(info.result.num);
                })
        });
        return promise;
    }

    getUseCard(): Promise<number> {
        let promise = new Promise((resole, reject) => {
            this.Parse.Parse.Cloud.run(this.api.GMAPI,
                { pathname: this.api.CARD_TOTLE_USE, query: "" })
                .then(result => {
                    let info = JSON.parse(result);
                    if (info.error_code != 0) resole(0);
                    resole(info.result.num);
                })
        });
        return promise;
    }

}