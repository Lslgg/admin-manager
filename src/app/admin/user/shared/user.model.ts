export class User{
    public id:string="";
    public username:string="";
    public passWord:string="";
    public oldpassWord:string;
    public confirmpassword;
    public roleId:string="";
    public roleName:string="角色名称";
    public card:Number=0;
    public addCard:Number=0;
    public email:string="";
    public phone:string="";
    public address:string="";
    public lastLoginTime:Date;
    public lastLoginIp:string="";
    public updateAt:Date;
    public createdAt:Date;
    public isDel:boolean=false;
    public isValid:boolean=true;
}

export class CardLog{

}