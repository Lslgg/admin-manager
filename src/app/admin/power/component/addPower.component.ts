import { Component, OnInit } from '@angular/core';
import { Tree,Power ,RolePower} from '../shared/power.model';
import { PowerService } from '../shared/power.service';

@Component({
    selector: 'admin-add-power',
    styleUrls:['../power.css'],
    templateUrl: 'addPower.html',
    providers:[PowerService]
})

export class AddPowerComponent implements OnInit {

    treeList:Array<Tree>;

    dataList:Array<object>=[];

    roleId:string="";

    roleName:string="无";

    powerList:Array<Power>=[];

    constructor(public powerService:PowerService) {
        this.getRoleTree();
        this.getPowerList();
    }

    ngOnInit() { }
  
    onUpdateTree(id:string){
        this.roleId=id;
        this.powerService.getRoleInfo(id).then(val=>{
            this.roleName=val.roleName;
        })
        this.getRolePower();
    }

    onCheckAll(checked:boolean,list:Array<object>){
		list.forEach(p=>p["isCheck"]=checked);
	}

    onDelList(){
       if (confirm("确认要删除！")) {
			var isTip = true;
			this.dataList.forEach(val => {
				if (val["isCheck"]) {
					this.powerService.deleteRolePower(val["id"]).then(succes => {
						if (isTip) alert("删除成功！");
						isTip = false;
                        this.getRolePower();
					})
				}
			});
		}
    }

    onModalSave(list:Array<Power>){
        if(this.roleId==""){
            alert("请选择角色！");
            return ;
        }
        var dbList=this.setRolePower(list);
		this.powerService.saveRolePower(dbList).then(
			success => {
				alert(success ? "添加成功！" : "添加失败！");
                this.getRolePower();
			})
    }

    getRolePower(){
        this.dataList=[];
        this.powerService.getRolePowerList(this.roleId).then(list=>{
            let operationMap = this.powerService.operationMap();
            list.forEach(val=>{
               Object.assign(val,{isCheck:false})
               val.operation.forEach(item=>{
				    val.operationMap.push(operationMap.get(item));
               })
                this.dataList.push(val); 
            })
        });
    }

    getPowerList(){
        this.powerService.getPowerList().then(list=>{
            this.powerList=[];
            let operationMap = this.powerService.operationMap();
            list.forEach(val=>{
               Object.assign(val,{isCheck:false})
               val.operation.forEach(item=>{
				    val.checkboxList.push({value:item,name:operationMap.get(item),isCheck:true});
               })
                this.powerList.push(val); 
            })
        })
    }

    getRoleTree(){
        this.powerService.getRoleList().then(list=>{
            let trees:Array<Tree>=[];
            list.forEach(p=>{
                trees.push(new Tree(p.id,"0",p.roleName,true))
            })
            this.treeList=trees;
        })
    }

    setRolePower(list:Array<Power>):Array<RolePower>{

        var dblist = new Array<RolePower>();
		list.forEach(val => {
			if (val["isCheck"]) {
				var power = new RolePower();
				power.id = "";
				power.roleId = this.roleId;
				power.code = "00001";
				power.explain = power.explain;
				power.title = val.title;
				power.type = val.type;
				power.url = val.url;
				power.isValid = true;
				power.menuId = val.id;
				power.operation = val.operation;
				dblist.push(power);
			}
		});

        return dblist;
    }
}