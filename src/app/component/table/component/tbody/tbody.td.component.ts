import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: '[tbody-td]',
    templateUrl:'tbody.td.html'
})

export class TbodyTdComponent implements OnInit {
    
    @Input() item: object;

    @Input() title: string|number|Array<string>|boolean;

    @Input() colType: string;

    @Input() id: string;

    @Input() field: string;

    @Output() onSetInfo = new EventEmitter<IdType>();

    constructor() { }

    ngOnInit() { }

    setInfo(info:IdType) {
        this.onSetInfo.emit(info);
    }
    
    allCheck(isCheck:boolean){
        console.log(this.item["checkboxList"]);
        for(var i=0;i<this.item["checkboxList"].length;i++){
            var self=this.item["checkboxList"][i];
            self["isCheck"]=isCheck;
        }
    }

    singleCheck(val:object){
        val["isCheck"]=!val["isCheck"];
        console.log(val);
    }
}