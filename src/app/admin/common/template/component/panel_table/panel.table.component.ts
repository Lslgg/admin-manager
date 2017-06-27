import { Component, OnInit, Input,Inject,EventEmitter,Output } from '@angular/core';

@Component({
    selector: 'template-panel-table',
    templateUrl: 'panel.table.html'
})

export class PanelTableComponent {

    @Input() Title:string;

    @Input() showOpeation:boolean=true;

    @Output() onAdd = new EventEmitter<number>();

    @Output() onDelete = new EventEmitter();
    

    onAddInfo(){
        this.onAdd.emit();
    }

    delete(){
        if(confirm("是否真的要删除！")){
            this.onDelete.emit();
        }
    }
}