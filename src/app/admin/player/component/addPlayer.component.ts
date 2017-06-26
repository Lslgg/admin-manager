import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PlayerService, Player } from '../shared'

@Component({
    selector: 'admin-add-player',
    templateUrl: 'addPlayer.html',
    providers: [PlayerService]
})

export class AddPlayerComponent implements OnInit {

    playerForm: FormGroup;

    player: Player;

    constructor(private router: Router,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private playerService: PlayerService) {

        this.createForm();

        let id = this.route.snapshot.params['id'];
        if (id != undefined) {
            this.getPlayerInfo(id);
        }

    }

    ngOnInit() { }

    createForm() {
        this.playerForm = this.fb.group({
            name: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(1)]],
            cardNum: [{ value: 0, disabled: true }, Validators.required],
            addCardNum: [1, Validators.required]
        }, { validator: this.isNumber });
    }

    //密码验证
    private isNumber(g: FormGroup) {
        if (g.get("addCardNum").value <=0) {
            g.get('addCardNum').setErrors({ isNumber: true })
        }
    }

    getPlayerInfo(id: string) {
        this.playerService.getInfo(id).then(val => {
            this.player = val;
            this.playerForm.get("name").setValue(val.name);
            this.playerForm.get("cardNum").setValue(val.cardNum);
        })
    }

    onSubmit(info: object) {
        let carNum=info["addCardNum"];
        this.playerService.upInfo(this.player.id,carNum,
            this.player.name).then(success=>{
            alert(success?"充值成功！":"充值失败！");
            this.router.navigate(['../admin/player']);
        });
    }
}