import { Component, OnInit } from '@angular/core';

import { System } from './shared/system.model';
import { SystemService } from './shared/system.service';

@Component({
	selector: 'system',
	templateUrl: 'system.component.html',
	providers: [SystemService]
})

export class SystemComponent implements OnInit {
	system: System[] = [];

	constructor(private systemService: SystemService) { }

	ngOnInit() {
		this.systemService.getList().subscribe((res) => {
			this.system = res;
		});
	}
}