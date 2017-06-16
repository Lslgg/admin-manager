import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tree } from "../../shared/tree.modle";

@Component({
    selector: 'tree-item',
    styleUrls: ["../tree.css"],
    templateUrl:'treeItem.html',
})
export class TreeItemComponent implements OnInit {

    @Input() tree:Tree;

    @Input() treeList: Array<Tree>=[];

    @Output() onDelete = new EventEmitter<string>();

    subList:Array<Tree>=[];

    IsSubMenu: boolean = false;

    constructor(){

    }

    ngOnInit() {

    }

    getSubMenu(id: string) {
       this.subList=this.treeList.filter(p=> p.pid==id);
       this.IsSubMenu=this.subList.length>0;
    }

    addMenu(id: string, type: number) {
    }

    deleteMenu(id: string, pid: string) {
        
    }

    //删除重新加载新新数据
    onDeleteInfo(id: string) {
        this.getSubMenu(id);
    }
}