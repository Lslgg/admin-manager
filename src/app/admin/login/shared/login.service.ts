import { Injectable, Inject } from '@angular/core';

@Injectable()
export class LoginService {
    Parse: ParserServer;
    constructor(@Inject("parseManager") parse) {
        this.Parse = parse;
    }

    login(account: string, pwd: string): Promise<boolean> {
        var promise = new Promise((resolve, reject) => {
            this.Parse.Parse.User.logIn(account, pwd, {
                success:  (user)=>  resolve(true),
                error: (user, error) => reject(false)
            })
        });
        
        return promise;
    }
}