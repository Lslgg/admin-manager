import { Component, OnInit, ViewChild } from '@angular/core';
import { Power } from './shared/power.model';
import { PowerService } from './shared/power.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
	selector: 'admin-power',
	styleUrls: ['power.css'],
	templateUrl: 'power.html',
	providers: [PowerService]
})

export class PowerComponent implements OnInit {

	nowPower: Power = new Power();
	operation: Array<string> = new Array<string>();

	powerForm:FormGroup;

	//选择菜单条件
	menuCondition:ConditionList=[];

	constructor(public powerService:PowerService,private fb: FormBuilder){
		this.menuCondition.push({ field: 'isLeaf', value: true, condition: "=" });
		this.createForm();
	}

	ngOnInit() {
		
	}

	 createForm() {
        this.powerForm = this.fb.group({
            title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(24)]],
            code: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(24)]],
            url: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(24)]],
            isValid: true
        });
    }


	onCheckboDelete(list:Array<object>,tablePower:any) {

		if (confirm("确认要删除！")) {
            var isTip=true;
            list.forEach(val => {
                if (val["isCheck"]) {
                    this.powerService.delete(val["id"]).then(succes => {
                        if(isTip){
							alert("删除成功！");
							tablePower.getPage(1);
						}
                        isTip=false;
                    })
                }
            });
        }
	}

	onSetInfo(info: IdType, funModal: any,list:Array<Power>) {
		var { id, type } = info;
		if (type == "功能权限") {
			funModal.show();
			var self=list.filter(val=>val["id"]==id);
			this.nowPower=self[0];
		}
	} 

	onModalSave(naveMenulist:Array<object>,tablePower:any){
		var list=this.setPowerByMenu(naveMenulist);
        this.powerService.saveInfo(list).then(success => {
            alert(success ? "添加成功！" : "添加失败！");
			tablePower.getPage(1); 
        })
	}

	onCheckAll(checked:boolean,list:Array<object>){
		list.forEach(p=>p["isCheck"]=checked);
	}

	onFunCheck(obj: any) {
        let checked = obj.target.checked;
        let value = obj.target.value;
        var index = this.operation.indexOf(value);

        if (index > -1) this.operation.splice(index, 1);
        if (checked) this.operation.push(value);

        this.nowPower.operation = this.operation;
    }

	onSaveFunPower() {
        this.powerService.saveInfo([this.nowPower]).then(success => alert(success ? "成功！" : "失败！"));
    }

	onSubmit(info:object,tablePower:any){
		var power: Power = new Power();
		Object.assign(power,info);
		power.explain = "自定义权限菜单";
        power.type = "自定义";
        power.operation = ["SHOW", "ADD", "UPDATE", "DELETE"];
        this.powerService.saveInfo([power]).then(success => {
			alert(success ? "成功！" : "失败！");
			tablePower.getPage(1);
		});
	}

	private setPowerByMenu(naveMenulist:Array<object>):Array<Power>{
		var list = new Array<Power>();
		for(var i=0;i<naveMenulist.length;i++){
			var val=naveMenulist[i];
			if (val["isCheck"]) {
                var power = new Power();
				Object.assign(power,val);
                power.id = "";
                power.code = "0000"+i;
                power.explain = "来自系统的菜单";
                power.type = "系统菜单";
                power.menuId = val["id"];
                power.operation = ["SHOW", "ADD", "UPDATE", "DELETE"];
                list.push(power);
            }
		}
		return list;
	}
}