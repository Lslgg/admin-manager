import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LayoutsService } from './shared/layouts.service';

@Component({
    selector: 'layouts-header',
    templateUrl: 'header.html',
    styles:[`
        header.navbar .navbar-brand2 {
            display: inline-block;
            width: 155px;
            height: 55px;
            line-height:55px;
            text-align:center;
            margin-right: 0;
            text-decoration:none;
        }
    `],
    providers: [LayoutsService]

})

export class HeaderComponent implements OnInit {
    public disabled: boolean = false;
    public status: { isopen: boolean } = { isopen: false };

    userName:string;

    card:number;

    public toggled(open: boolean): void {

    }

    public toggleDropdown($event: MouseEvent): void {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    }

    Parse: any;

    constructor(@Inject("parseManager") parse, private router: Router,
        private layoutsService:LayoutsService) {
        this.Parse = parse.Parse;
        let user=this.layoutsService.getCurrentUserInfo();
        this.userName=user.name;
        this.card=user.card;
        if(this.userName==""){
            alert("请登录！");
            this.router.navigate(['login']);
        }
    }


    LogOut() {
        this.Parse.User.logOut().then(() => {
            alert("已成功退出！");
            this.router.navigate(['login']);
        });
    }

    upUserPwd() {
        this.router.navigate(['/admin/upUserPwd']);
    }

    upUserInfo() {
        this.router.navigate(['/admin/upUserInfo']);
    }

    ngOnInit() { }
}