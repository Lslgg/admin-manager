import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../animations/router.animation'

@Component({
    selector: 'home-brief',
    template: `
        <home-introduction></home-introduction>
        <home-rule></home-rule>
        <home-about></home-about>
        <home-footer></home-footer>
    `,
    animations: [routerTransition()],
    host: { '[@routerTransition]': '' }
})

export class HomeBriefComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}