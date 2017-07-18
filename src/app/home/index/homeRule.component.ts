import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../animations/router.animation'

@Component({
    selector: 'home-home-rule',
    template: `
        <home-rule></home-rule>
        <home-about></home-about>
        <home-footer></home-footer>
    `,
    animations: [routerTransition()],
    host: { '[@routerTransition]': '' }
})

export class HomeRuleComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}