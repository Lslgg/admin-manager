import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'font-awesome',
    templateUrl: 'fontawesome.html'
})

export class FontawesomeComponent implements OnInit {

    @Output() onSetImg = new EventEmitter<string>();

    constructor() { }

    ngOnInit() { }

    setImg(event: any) {
        var className = event.target.className;
        className=className.replace("fa-lg","");
        this.onSetImg.emit(className);
    }
}
