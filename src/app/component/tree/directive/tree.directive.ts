import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({ selector: '[menuroot]' })
export class TreeDirective {
    constructor(private el: ElementRef) {

    }

    @HostListener('click') onclick() {
        let className = this.el.nativeElement.className;
        let id = this.el.nativeElement.id;
        let isopen = "fa fa-plus-square" == className;
        this.toggle(isopen, id, className);
    }

    private toggle(isopen: boolean, id: string, className: string) {
        let nowEl = this.el.nativeElement.classList;
        if (isopen) {
            nowEl.remove("fa-plus-square");
            nowEl.add("fa-minus-square");
        } else {
            nowEl.add("fa-plus-square");
            nowEl.remove("fa-minus-square");
        }

        let menuList = document.body.querySelectorAll('.menu_' + id);

        let index = 0;
        for (index; index < menuList.length; index++) {
            menuList[index].classList.toggle("hiden");
        }
    }
}

@Directive({ selector: '[menuhover]' })
export class TreeTrhover {
    constructor(private el: ElementRef) {

    }

    @HostListener('mouseenter') onMouseEnter() {
        this.TrbgColor("#efeffe");
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.TrbgColor("white");
    }

    private TrbgColor(color: string) {
        this.el.nativeElement.style.backgroundColor = color;
        let operationList = this.el.nativeElement.getElementsByClassName("operation");
        for (var i = 0; i < operationList.length; i++) {
            operationList[i].classList.toggle("hiden");
        }
    }
}