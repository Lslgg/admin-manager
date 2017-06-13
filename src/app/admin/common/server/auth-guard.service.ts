import { Injectable, Inject } from '@angular/core';
import { AuthPower } from './shared/AuthPower';

import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild
} from '@angular/router';



@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    parseServer: ParserServer;

    constructor(@Inject("parseManager") parse,
        private router: Router) {
        this.parseServer = parse;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
        return true;
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
