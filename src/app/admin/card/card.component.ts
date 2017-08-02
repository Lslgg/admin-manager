import { Component, OnInit } from '@angular/core';
import { CardService } from './shared';
import { Route,Router } from '@angular/router';

@Component({
	selector: 'admin-card',
	templateUrl: 'card.html',
	providers:[CardService]
})

export class CardComponent implements OnInit {

	roleList:Array<{}>=[];

	constructor(private cardService:CardService,private router: Router,){
		//用户角色列表项
        this.cardService.getRoleList().then(list => {
            list.forEach(val => {
                this.roleList.push({ key: val.id, value: val.roleName });
            })
        });
	}

	ngOnInit() { 
		
	}
	
	onSetInfo(info:IdType){
		var {id,type}=info;
		if(type=="充值"||type=="username"){
			 this.router.navigate(['../admin/addCard', id]);
		}
	}
}