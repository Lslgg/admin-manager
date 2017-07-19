import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
@Component({
    selector: 'home-hader',
    styleUrls: ['../index.css'],
    template: `
        <div class="row">
            <div class="col-md-4 hader">
                <img class="logo" src="assets/img/home/logo.png" alt="mjhead">
            </div>
            <div class="col-md-8">
                <nav class="nav nav-inline" #navLine>
                    <a class="nav-link" routerLinkActive="active" routerLink="/home">网站首页</a>
                    <a class="nav-link" routerLinkActive="active" routerLink="/home/introduction">游戏简介</a>
                    <a class="nav-link" routerLinkActive="active" routerLink="/home/rule">规则玩法</a>
                    <a class="nav-link" routerLinkActive="active" routerLink="/home/about">关于我们</a>
                    <a class="nav-link" routerLinkActive="active" routerLink="/home/code">扫码下载</a>
                </nav>
            </div>
        </div>
    `,
})

export class HaderComponent implements OnInit {
    @ViewChild('navLine') navLineViewChild: ElementRef;
    constructor() { }

    ngOnInit() { }

    getNavLine(url: string) {
        let elementList = this.navLineViewChild.nativeElement.querySelectorAll("a");
        let length = elementList.length;
        for (var index = 0; index < length; index++) {
            var self=elementList[index];
            var selfUrl=self.getAttribute("routerlink");
            self.classList.remove("active");
            if(selfUrl==url){
                self.classList.add("active");
            }
        }
    }

}