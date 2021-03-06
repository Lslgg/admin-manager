import { Injectable, Inject } from '@angular/core';
import { Advert } from './advert.model';

@Injectable()
export class AdvertService {
    
    api: CommonApi;
    
    Parse: ParserServer;

    tableName: string = "Advert";

    fileSrc:string="";
    constructor(@Inject("commonApi") commonApi,@Inject("parseManager") parse) {
        this.Parse = parse;
        this.fileSrc=this.Parse.fileSrc;
    }

    //添加修改广告
    public add(advert: Advert): Promise<boolean> {
        var dbMenu = this.Parse.setParseObj(this.tableName);
        var advertInfo = this.setInfo(advert, dbMenu);
        let promise = this.Parse.add(advertInfo);
        return promise;
    }

    getInfo(id: string): Promise<Advert> {
        let promise = this.Parse.getInfo<Advert>(id, this.tableName,Advert);
        return promise;
    }

    private setInfo(advert: Advert, dbInfo: any) {
        dbInfo.set("id", advert.id);
        dbInfo.set("title", advert.title);
        dbInfo.set("type", advert.type);
        dbInfo.set("imageSrc", advert.imageSrc);
        dbInfo.set("activity", parseInt(advert.activity.toString()));
        dbInfo.set("declare", advert.declare);
        dbInfo.set("startDate", new Date(advert.startDate));
        dbInfo.set("endDate", new Date(advert.endDate));
        dbInfo.set("isValid", advert.isValid);
        return dbInfo;
    }
}