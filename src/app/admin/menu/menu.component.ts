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

    nowTree: Tree;

    constructor(private router: Router, private menuService: MenuService) {
        this.menuService.getListByPid("0").then(list => {
            this.treeList = this.setTree(list);
        });
    }

    ngOnInit() {

    }

    setTree(list: Array<Menu>): Array<Tree> {
        let trees: Array<Tree> = [];
        list.forEach(p => {
            this.menuService.getListByPid(p.id).then(subList => {
                var isLeaf = subList.length > 0;
                trees.push(new Tree(p.id, p.pid, p.title, !isLeaf));
            })
        });
        return trees;
    }

    //加载字菜单
    onGetSubTree(tree: Tree) {
        if (tree == null) return;
        this.nowTree = tree;
        if (tree.subTrees.length > 0) return;
        this.menuService.getListByPid(tree.id).then(list => {
            tree.subTrees = this.setTree(list);
            tree.IsSubMenu = list.length > 0;
        });
    }

    //添加菜单
    onAddTree(id: string) {
        this.router.navigate(['/admin/addMenu/' + id + "/1"]);
    }

    //删除菜单
    onDeleteTree(info: { id: string, pid: string }) {
        var { id, pid } = info;
        if (!confirm("确认要删除！")) return
        this.menuService.getListByPid(id).then(list => {
            if (list.length > 0) {
                alert("有子菜单不能删除，请先删除子菜单！");
                return;
            }
            this.menuService.delete(id).then(val => { //如果没有子菜单直接删除
                this.menuService.getListByPid(pid).then(list => {//删除后修改当前的父节点是否有子节点
                    if (list.length <= 0) {//如果没有子节点
                        this.menuService.getInfo(pid).then(val => {
                            val.isLeaf = true;//修改子段当前父节点为叶子节点
                            this.menuService.add(val).then(info => {
                                alert("删除成功！");
                                this.delArrayTree(id);

                            });
                        })
                        return;
                    }
                    //如果当前父节点有子节点，直接删除不用做什么
                    alert("删除成功!");
                    this.delArrayTree(id);
                })
            });
        })
    }

    delArrayTree(id) {
        this.treeList = this.treeList.filter(val => val.id != id);
        if (this.nowTree != null) {
            this.nowTree.subTrees = this.nowTree.subTrees.filter(val => val.id != id);
        }
        console.log(this.nowTree);
    }

    //修改菜单
    onUpdateTree(id: string) {
        this.router.navigate(['/admin/addMenu/' + id + "/2"]);
    }
}