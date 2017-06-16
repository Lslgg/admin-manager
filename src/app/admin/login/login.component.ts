import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './shared/login.service';

@Component({
    selector: 'admin-login',
    templateUrl: 'login.html',
    providers: [LoginService ]
})

export class LoginComponent implements OnInit {

    constructor(private loginService: LoginService,
        private router: Router) {

    }

    ngOnInit() {

    }

    onLogin(account:string,pwd:string){
		this.loginService.login(account,pwd)
		.then((val)=>{
            window.location.href="/#/admin/index";
			//this.router.navigate(['admin/index']);退出登录以后如果用这个会不加载信息
		}).catch((v)=>{
			alert("用户名密码错误，请输入正确的用户或密码！");
			this.router.navigate(['/login']);
		});
	}

}