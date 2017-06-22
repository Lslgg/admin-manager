import { Component, OnInit, ViewChild } from '@angular/core';
import { Power } from './shared/power.model';
import { PowerService } from './shared/power.service';

@Component({
	selector: 'admin-power',
	styleUrls: ['power.css'],
	templateUrl: 'power.html',
	providers: [PowerService]
})

export class PowerComponent implements OnInit {

	//选择菜单条件
	menuCondition:ConditionList=[];

	constructor(){
		this.menuCondition.push({ field: 'isLeaf', value: true, condition: "=" });
	}

	ngOnInit() {
		
	}

	onCheckboDelete() {

	}

	onSetInfo(info: IdType, funModal: any) {
		var { id, type } = info;
		if (type == "功能权限") {
			funModal.show();
		}
	}

	onModalSave(tableMenu:any){
		console.log(tableMenu);
	}
}