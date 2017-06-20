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

    @Output() onGetSubTree = new EventEmitter<object>();

    @Output() onAddTree = new EventEmitter<object>();

    @Output() onDeleteTree = new EventEmitter<object>();

    @Output() onUpdateTree = new EventEmitter<object>();

    constructor() { }

    ngOnInit() {
    }

    getSubTree(tree: Tree) {
        this.onGetSubTree.emit(tree);
    }

    addTree(info: object) {
        this.onAddTree.emit(info);
    }

    deleteTree(info: object) {
        this.onDeleteTree.emit(info);
    }

    updateTree(info: object) {
        this.onUpdateTree.emit(info);
    }
}