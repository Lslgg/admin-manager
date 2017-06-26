import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { SystemComponent } from './system.component';
import { SystemService } from './shared/system.service';
import { System } from './shared/system.model';

describe('a system component', () => {
	let component: SystemComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpModule],
			providers: [
				{ provide: SystemService, useClass: MockSystemService },
				SystemComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([SystemComponent], (SystemComponent) => {
		component = SystemComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});

// Mock of the original system service
class MockSystemService extends SystemService {
	getList(): Observable<any> {
		return Observable.from([ { id: 1, name: 'One'}, { id: 2, name: 'Two'} ]);
	}
}
