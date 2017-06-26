import { Injectable, Inject } from '@angular/core';

import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild
} from '@angular/router';

export class AuthPower {
    public id: string;
    public url: string;
    public operation: Array<string> = new Array<string>();
}

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    parseServer: ParserServer;

    constructor(@Inject("parse") parse,
        private router: Router) {
        this.parseServer = parse;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
        let promise = new Promise<boolean>((resolve, reject) => {
            var urlData = route.data;
            let url = urlData["module"];
            let power = urlData["power"];
            if (url == "index" || url == "notPower" || url=="allpower") {
                resolve(true);
                return;
            }

            var isSuccess = false;
            this.getRolrPowerList().then(list => {
                list.forEach(val => {
                    var index = val.operation.indexOf(power);
                    if (val.url == url && index > -1) {
                        isSuccess = true;
                    }
                });
                resolve(true);
                if (!isSuccess) {
                    this.router.navigate(['/admin/notPower']);
                    return;
                }
            }).catch(error => {
                reject(false);
            })
        });

        return promise;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
        return this.canActivate(route, state);
    }

    getRolrPowerList(): Promise<Array<AuthPower>> {
        var currentUser = this.parseServer.Parse.User.current();
        let roleId = currentUser.get("roleId");
        var rolePower = this.parseServer.setQuery("RolePower");
        rolePower.equalTo("roleId", roleId);
        let promise = this.parseServer.getList<AuthPower>(rolePower);
        return promise;
    }
}