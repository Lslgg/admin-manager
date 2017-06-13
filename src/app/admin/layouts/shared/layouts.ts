export class NavMenu{
    public id:string;
    public pid:string;
    public code:string;
    public url:string;
    public title:string;
    public subNavMenuList:Array<NavMenu>=new Array<NavMenu>();
}