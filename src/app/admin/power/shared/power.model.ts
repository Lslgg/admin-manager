export class Power{
    public id:string;
    public code:string;
    public url:string;
    public title:string;
    public explain:string;
    public menuId:string;
    public type:string;
    public isValid:boolean;
    public isChecked:boolean=false;  
    public operation:Array<string>=new Array<string>();
    public operationChecked:Array<string>=new Array<string>();
    public operationMap:Array<string>=new Array<string>();
}

export class RolePower extends Power{
    public roleId:string;
}

export class NavMenu{
    public id:string;
    public code:string;
    public url:string;
    public isValid:boolean=true;
    public isLeaf:boolean=false;
    public title:string;
    public isChecked:boolean=false;
}

export class PowerFun{
    public isSHOW:boolean;
    public isADD:boolean;
    public isUPDATE:boolean;
    public isDELETE:boolean;
    public isCHECK:boolean;
}

export class RoleInfo{
    public id:string;
    public roleName:string;
    public name:string;
    public desc:string;
}