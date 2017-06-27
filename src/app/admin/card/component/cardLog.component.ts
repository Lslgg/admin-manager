import { Component, OnInit } from '@angular/core';
import { CardService } from '../shared'

@Component({
    selector: 'admin-cardLog',
    templateUrl: 'cardLog.html',
    providers:[CardService]
})

export class CardLogComponent implements OnInit {
    
    startDate:Date=new Date();

    stopDate:Date=new Date();
    
    constructor(private cardService:CardService) { }

    ngOnInit() { }

    onDelete(tableList:any){
        var dataList:Array<{id:string,isCheck:boolean}>=tableList["dataList"];
        var ids=dataList.filter(p=> p.isCheck).map(p=>p.id);
        this.cardService.deleteAll(ids).then(success=>{
            alert(success?"删除成功！":"删除失败！");
            if(success){//重新加载
                tableList.getPage(1);
            }
        }) 
    }

    onCheckAll(isCheck:boolean,dataList:Array<{id:string,isCheck:boolean}>){
        dataList.forEach(p=>p.isCheck=isCheck);
    }
}
