export class Menu{
    public id:string;
    public pid:string;
    public title:string;
    public parentTitle:string;
    public isLeaf:boolean;
    public url:string;
    public code:string;
    public menuImg:string;
    public isValid:boolean;
    public colloction:string
}

export class Tree{
    public id:string;
    public pid:string;
    public name:string;
    public isLeaf:boolean;
    public IsSubMenu:boolean=false;
    public subTrees:Array<Tree>=[];
    constructor(id:string,pid:string,name:string,isLeaf:boolean){
        this.id=id;
        this.pid=pid;
        this.name=name;
        this.isLeaf=isLeaf;
    }
}