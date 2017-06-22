import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tree } from "../shared/tree.modle";

@Component({
    selector: 'data-tree',
    styleUrls: ['tree.css'],
    templateUrl: 'tree.html'
})

export class TreeComponent implements OnInit {

    @Input() treeList: Array<Tree> = [];

    @Input() isShowRoot: boolean = true;

    @Input() isOperation:boolean=false;

    @Output() onGetSubTree = new EventEmitter<object>();

    @Output() onAddTree = new EventEmitter<string>();

    @Output() onDeleteTree = new EventEmitter<object>();

    @Output() onUpdateTree = new EventEmitter<string>();

    constructor() { }

    ngOnInit() {
        
    }

    getSubTree(tree: Tree) {
        this.onGetSubTree.emit(tree);
    }

    addTree(id: string) {
        this.onAddTree.emit(id);
    }

    deleteTree(info: { id: string, pid: string }) {
        this.onDeleteTree.emit(info);
    }

    updateTree(id: string) {
        this.onUpdateTree.emit(id);
    }
}