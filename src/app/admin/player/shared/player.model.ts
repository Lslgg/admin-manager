export class CardLog{
    public id:string;
    public userId:string;
    public userName:string;
    public targetId:string;
    public targetName:string;
    public card:Number;
    public type:string;
    public desc:string;
    public updateAt:Date;
    public createdAt:Date;
    public createAtFormt:string;
    public userType:number;
}

export class Player{
    public id:string;
    public name:string;
    public cardNum:number;
    public addCardNum:number;
}