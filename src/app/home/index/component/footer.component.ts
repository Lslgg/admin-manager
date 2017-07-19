import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'home-footer',
    styleUrls: ['../index.css'],
    template: `
        <div class="row">
            <div class="col-md-12 footer">
                COPYRIGHT &copy; 2015-2020 WWW.HLYDMJ.COM 英德市飓风网络网络科技有限公司 版权所有 粤 ICP 备 150601174号
            </div>
        </div>
    `,
})

export class FooterComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}