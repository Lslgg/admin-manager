import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../animations/router.animation'

@Component({
    selector: 'home-home-about',
    template: `
        <home-about></home-about>
        <home-footer></home-footer>
    `,
    animations: [routerTransition()],
    host: { '[@routerTransition]': '' }
})

export class HomeAboutComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}