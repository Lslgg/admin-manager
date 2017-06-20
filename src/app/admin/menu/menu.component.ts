import { Component, OnInit } from '@angular/core';
import { Menu, Tree, MenuService } from "./shared";
import { Router } from '@angular/router';
@Component({
    selector: 'admin-menu',
    templateUrl: 'menu.html',
    providers: [MenuService]
})

export class MenuComponent implements OnInit {

    treeList: Array<Tree> = [];

    constructor(private router: Router,private menuService: MenuService) {
        this.menuService.getListByPid("0").then(list => {
            this.treeList = this.setTree(list);
        });
    }

    ngOnInit() {
        
    }

    setTree(list: Array<Menu>): Array<Tree> {
        let trees: Array<Tree> = [];
        list.forEach(p => {
            this.menuService.getListByPid(p.id).then(subList=>{
                var isLeaf=subList.length>0;
                trees.push(new Tree(p.id,p.pid,p.title,!isLeaf));
            })
        });
        return trees;
    }
    
    //加载字菜单
    onGetSubTree(tree:Tree) {
        if(tree==null) return;
        if(tree.subTrees.length>0) return;
        this.menuService.getListByPid(tree.id).then(list => {
            tree.subTrees=this.setTree(list);
            tree.IsSubMenu=list.length>0;
        });
    }

    //添加菜单
    onAddTree(info:object){
         this.router.navigate(['/admin/addMenu/' + info["id"] + "/" + info["type"]]);
    }

    //删除菜单
    onDeleteTree(info:object){
        console.log(info);
    }
    
    //修改菜单
    onUpdateTree(info:object){
         console.log(info);
        this.router.navigate(['/admin/addMenu/' + info["id"] + "/" + info["type"]]);
    }
}