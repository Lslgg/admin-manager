import { Component, OnInit, Input } from '@angular/core';
import { Tree } from "../shared/tree.modle";

@Component({
    selector: 'data-tree',
    styleUrls:['tree.css'],
    templateUrl:'tree.html'
})

export class TreeComponent implements OnInit {

    @Input() treeList:Array<Tree>=[];

    fristList:Array<Tree>=[];

    constructor() { }

    ngOnInit() {
    }

    getSubTree() {
        this.fristList=this.treeList.filter(p=>p.pid=="0");
    }
}