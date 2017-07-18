import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'home-hader',
    styleUrls: ['../index.css'],
    template: `
        <div class="row">
            <div class="col-md-4 hader">
                <img class="logo" src="assets/img/home/logo.png" alt="mjhead">
            </div>
            <div class="col-md-8">
                <nav class="nav nav-inline">
                    <a class="nav-link" routerLinkActive="active" routerLink="/home">网站首页</a>
                    <a class="nav-link" routerLinkActive="active" routerLink="/home/introduction">游戏简介</a>
                    <a class="nav-link" routerLinkActive="active" routerLink="/home/rule">规则玩法</a>
                    <a class="nav-link" routerLinkActive="active" routerLink="/home/about">关于我们</a>
                    <a class="nav-link" routerLinkActive="active" routerLink="/home">扫码下载</a>
                </nav>
            </div>
        </div>
    `,
})

export class HaderComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}