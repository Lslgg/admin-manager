import { Component, OnInit, Input, ViewChild ,Output ,EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
@Component({
	selector: 'data-modal',
	templateUrl: 'dataModal.html'
})

export class DataModalComponent implements OnInit {

	@Input() title: string;

	@Input() isShowFooter:boolean=true;

	@ViewChild('lgModal') lgModal: ModalDirective;

 	@Output() onModalSave = new EventEmitter();

	ngOnInit() {
		
	}

	show(){
		this.lgModal.show();
	}

	close(){
		this.lgModal.hide();
	}

	modalSave(){
		this.onModalSave.emit();
	}

}