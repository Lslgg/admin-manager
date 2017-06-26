import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { System } from './system.model';

@Injectable()
export class SystemService {

	constructor(private http: Http) { }

	getList(): Observable<System[]> {
		return this.http.get('/api/list').map(res => res.json() as System[]);
	}
}