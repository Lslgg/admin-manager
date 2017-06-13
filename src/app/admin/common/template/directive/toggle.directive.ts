import { Directive, HostListener, Input } from '@angular/core';

/**
* Allows the aside to be toggled via click.
*/
@Directive({
    selector: '[togglerInfo]',
})

export class ToggleDirective {

   @Input() className: string;

    constructor() { }

    @HostListener('click', ['$event'])
    toggler($event: any) {
        $event.preventDefault();
        var list = document.getElementsByClassName(this.className);
        for (var i = 0; i < list.length; i++) {
            list[i].classList.toggle("hiden");
        }
    }
}
