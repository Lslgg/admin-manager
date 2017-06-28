import { Component, OnInit } from '@angular/core';
import { IndexService } from './shared/index.service';

@Component({
    selector: 'app-index',
    templateUrl: 'index.html',
    providers:[IndexService],
})
export class IndexComponent implements OnInit {

    totalPlayer:number;
    newPlayer:number;
    onlinePlayer:number;
    useCard:number;
    
    constructor(private indexService:IndexService) { 
        this.indexService.getUseCard().then(num=>{
            this.useCard=num;
        });
        this.indexService.getTotalPlayer().then(num=>{
            this.totalPlayer=num;
        });
        this.indexService.getOnlinePlayer().then(num=>{
            this.onlinePlayer=num;
        });
        this.indexService.getNewPlayer().then(num=>{
            this.newPlayer=num;
        });
    }

    ngOnInit() { }
}