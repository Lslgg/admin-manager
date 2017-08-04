import { Injectable, Inject } from '@angular/core';

@Injectable()
export class TableService {

    Parse: ParserServer;

    constructor(@Inject("parseManager") parse) {
        this.Parse = parse;
    }

    getDataList(pageInfo:Pages): Promise<{list:Array<any>,count:number}> {
        let list=this.Parse.getPageList(pageInfo);
        return list;
    }

    delInfo(id:string,tableName:string):Promise<boolean>{
       let promise= this.Parse.delete(id,tableName);
       return promise;
    }

    getDataTotal(name:string, coditions:ConditionList,
            totals:Array<{name:string,title:string,total:number}>) {
        this.Parse.getLists(name,coditions).then(result=>{
            totals.forEach(p=>p.total=0);
             for (let i = 0; i < result.length; i++) {
                 totals.forEach(p=>{
                    p.total+= result[i][p.name];
                 })
            }
        })
    }
}