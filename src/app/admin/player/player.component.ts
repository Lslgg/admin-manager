import { Component, OnInit } from '@angular/core';
import { PlayerService, Player } from './shared'
import { Router } from '@angular/router';

@Component({
	selector: 'player',
	styleUrls: ["player.css"],
	templateUrl: 'player.html',
	providers: [PlayerService]
})

export class PlayerComponent implements OnInit {

	pageSize: number = 10;

	pageCount: number = 1;

	playerList: Array<Player>;

	constructor(
		private router:Router,
		private playerService: PlayerService) {

	}

	ngOnInit() {
		this.getPlayerList(1);
	}

	onAdd() {

	}

	getPlayerList(pageIndex: number) {
		this.playerService.getList(pageIndex, this.pageSize).then(list => {
			this.playerList = list;
		});

		this.playerService.getCount().then(count => {
			this.pageCount = count;
		})
	}

	ongetPage(pageIndex: number) {
		this.getPlayerList(pageIndex);
	}

	onSetInfo(info: IdType) {
		var { id, type } = info;
		if (type == '充值') {
			this.router.navigate(['../admin/addPlayer',id]);
		}
	}

	onSearch(conInfo: ConditionList) {
		var id = conInfo[0].value.toString();
		this.playerService.getInfo(id).then(info => {
			this.playerList = [info];
			this.pageCount = 1;
		})
	}
}