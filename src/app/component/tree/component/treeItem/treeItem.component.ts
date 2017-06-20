import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tree } from "../../shared/tree.modle";

@Component({
    selector: 'tree-item',
    styleUrls: ["../tree.css"],
    templateUrl: 'treeItem.html',
})
export class TreeItemComponent implements OnInit {

    @Input() tree: Tree;

    @Input() treeList: Array<Tree> = [];

    @Output() onDeleteTree = new EventEmitter<object>();

    @Output() onGetSubTree = new EventEmitter<Tree>();

    @Output() onAddTree = new EventEmitter<object>();

    @Output() onUpdateTree = new EventEmitter<object>();


    constructor() {

    }

    ngOnInit() {

    }

    //下开方法因为控件自己调用了自己，然后要传出去自己的方法，所以同一方法写了两次
    getSelfSubTree(tree: Tree) {
        this.onGetSubTree.emit(tree);
    }

    addSelfTree(id: string, type: number) {
        this.onAddTree.emit({ id: id, type: type });
    }

    updateSelfTree(id: string, type: number) {
        this.onUpdateTree.emit({ id: id, type: type })
    }

    deleteSelfTree(id: string, pid: string) {
        this.onDeleteTree.emit({ id: id, pid: pid });
    }

    getSubList(tree: Tree) {
        this.onGetSubTree.emit(tree);
    }

    addTree(info: { id: string, type: string }) {
        this.onAddTree.emit(info);
    }

    updateTree(id: string, type: number) {
        this.onUpdateTree.emit({ id: id, type: type })
    }

    deleteTree(info: { id: string, pid: string }) {
        this.onDeleteTree.emit({ id: info.id, pid: info.pid });
    }

}