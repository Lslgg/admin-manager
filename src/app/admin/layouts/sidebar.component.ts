import { Component, OnInit } from '@angular/core';
import { LayoutsService } from './shared/layouts.service';
import { NavMenu } from './shared/layouts';

@Component({
    selector: 'layouts-sidebar',
    templateUrl: 'sidebar.html',
    providers: [LayoutsService]
})

export class SidebarComponent implements OnInit {

    navMenuList: Array<NavMenu>;

    rolePower: Array<{ menuId, title }>;

    constructor(
        private layoutsService: LayoutsService) {
    }

    ngOnInit() {
        this.layoutsService.findAllMenu().then(list => {
            this.navMenuList = list;
            let navList = new Array<NavMenu>();
            this.navMenuList = this.getTreeList("0", navList);
            this.navMenuList.sort((t1, t2) => {
                if (t1.code > t2.code) return 1;
                if (t1.code < t2.code) return -1;
                return 0;
            });
        });
    }

    getTreeList(pid: string, navList: Array<NavMenu>): Array<NavMenu> {
        if (pid == "0") {
            navList = this.navMenuList.filter(v => v.pid == pid);
            this.getTreeList("1", navList);
        } else {
            navList.map(val => {
                let subList = this.navMenuList.filter(v => v.pid == val.id);
                val.subNavMenuList = subList;
                if (val.subNavMenuList.length > 0) {
                    this.getTreeList(val.id, val.subNavMenuList);
                }
            })
        }

        return navList;

    }
}