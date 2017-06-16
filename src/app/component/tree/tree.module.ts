import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeComponent, TreeItemComponent } from './component';
import { TreeDirective, TreeTrhover } from "./directive/tree.directive";

let commonList = [
    TreeComponent,
    TreeItemComponent
];

let directive = [
    TreeDirective, TreeTrhover
];

@NgModule({
    imports: [CommonModule],
    exports: [commonList],
    declarations: [directive, commonList],
    providers: [],
})

export class TreeModule { }
