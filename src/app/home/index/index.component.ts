import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../animations/router.animation'

@Component({
	selector: 'home-index',
	styles:['index.css'],
	templateUrl: 'index.html',
	animations: [routerTransition()],
    host: { '[@routerTransition]': '' }
})

export class IndexComponent implements OnInit {

	ngOnInit() { }
}