import { Component, OnInit } from '@angular/core';
import { Menu, MenuService } from "./shared";
@Component({
    selector: 'admin-menu',
    templateUrl: 'menu.html',
    providers: [MenuService]
})

export class MenuComponent implements OnInit {

    treeList: Array<{ id: string, pid: string, name: string, isLeaf: boolean }> = [];

    constructor(private menuService: MenuService) {

    }

    ngOnInit() {
        this.menuService.getList().then(list => {
            list.forEach(p => {
                this.treeList.push({
                    id: p.id,
                    pid: p.pid,
                    name: p.title,
                    isLeaf: list.filter(pp => pp.pid == p.id).length <= 0
                })
            });
        });
    }
}