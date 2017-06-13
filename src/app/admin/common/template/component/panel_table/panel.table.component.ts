import { Component, OnInit, Input,Inject,EventEmitter,Output } from '@angular/core';

@Component({
    selector: 'template-panel-table',
    templateUrl: 'panel.table.html'
})

export class PanelTableComponent {

    @Input() Title:string;

    @Output() onAdd = new EventEmitter<number>();

    onAddInfo(){
        this.onAdd.emit();
    }
}