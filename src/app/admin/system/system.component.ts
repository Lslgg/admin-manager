import { Component, OnInit } from '@angular/core';
import { SystemService } from './shared/system.service';

@Component({
    selector: 'app-system',
    templateUrl: 'system.html',
    providers:[SystemService],
})
export class SystemComponent implements OnInit {

    checkstr:boolean=false;
    news:string;
    notice:string;
    tip:string;
    version:string;

    iosUrl:string;
    iosVersion:string;
    androidUrl:string;
    androidVersion:string;
	

    constructor(private systemService:SystemService) { 
       this.systemService.getTip().then(val=>this.tip=val);
       this.systemService.getNews().then(val=>this.news=val);
       this.systemService.getNotice().then(val=> this.notice=val);
       this.systemService.getVersion().then(val=>{
           this.iosUrl=val["iosUrl"];
           this.androidUrl=val["androidUrl"];
           this.iosVersion=val["iosVersion"];
           this.androidVersion=val["androidVersion"];
       });
       this.systemService.getIfFree().then(val=>this.checkstr=val);
    }

    ngOnInit() { }


    set_news(){
        this.systemService.setNews(this.news).then(isSuccess=>{
            alert(isSuccess?"修改成功！":"修改失败！");
        })
    }

    set_notice(){
        this.systemService.setNotice(this.notice).then(isSuccess=>{
            alert(isSuccess?"修改成功！":"修改失败！");
        })
    }

    set_tip(){
        this.systemService.setTip(this.tip).then(isSuccess=>{
            alert(isSuccess?"修改成功！":"修改失败！");
        })
    }

    set_if_free(checked:boolean){
        this.systemService.setIfFree(checked).then(isSuccess=>{
            alert(isSuccess?"修改成功！":"修改失败！");
        })
    }

    set_version(){
        this.systemService.setVersion(this.iosUrl,this.iosVersion,
            this.androidUrl,this.androidVersion).then(isSuccess=>{
            alert(isSuccess?"修改成功！":"修改失败！");
        })
    }

}