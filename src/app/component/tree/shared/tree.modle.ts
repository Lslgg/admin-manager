export class Tree{
    public id:string;
    public pid:string;
    public name:string;
    public isLeaf:boolean;
    public IsSubMenu:boolean;
    public subTrees:Array<Tree>=[];
    constructor(id:string,pid:string,name:string,isLeaf:boolean){
        this.id=id;
        this.pid=pid;
        this.name=name;
        this.isLeaf=isLeaf;
    }
}