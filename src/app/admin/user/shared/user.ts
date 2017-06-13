export class User{
    public id:string;
    public username:string;
    public passWord:string;
    public oldpassWord:string;
    public confirmpassword:string;
    public roleId:string;
    public roleName:string="角色名称";
    public card:Number;
    public addCard:Number;
    public email:string;
    public phone:string;
    public address:string;
    public lastLoginTime:Date;
    public lastLoginIp:string;
    public updateAt:Date;
    public createdAt:Date;
    public isDel:boolean;
    public isValid:boolean;
}

export class CardLog{

}