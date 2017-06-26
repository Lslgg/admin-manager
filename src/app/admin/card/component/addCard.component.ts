import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CardService } from '../shared'

@Component({
    selector: 'admin-add-card',
    templateUrl: 'addCard.html',
    providers: [CardService]
})

export class AddCardComponent implements OnInit {

    userForm: FormGroup;

    user: { id: string, username: string, card: number };

    constructor(private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private cardService: CardService) {
        this.createForm();
        var id = this.route.snapshot.params["id"];
        this.cardService.getUserCard(id).then(val => {
            this.userForm.get("username").setValue(val.username);
            this.userForm.get("card").setValue(val.card);
            this.user = val;
        })
    }

    ngOnInit() { }

    createForm() {
        this.userForm = this.fb.group({
            username: [{ value: '', disabled: true }, [Validators.required]],
            card: [{ value: '', disabled: true }, Validators.required],
            addCard: [0, Validators.required]
        });
    }

    onSubmit(formInfo: object) {
        var addCard = parseInt(formInfo["addCard"]);
        if (addCard == 0) return;
        var username = this.user.username;
        var id = this.user.id;
        var success = false;
        if (addCard > 0) { //如果加房卡查看当前用户是否够加
            success = this.cardService.isCanAddCard(addCard);
        } else {//如果减房卡，判断减房卡的用户是否够减
            success = this.user.card + addCard < 0; 
        }
        if (success) {
            alert("你的房卡不够不能操作，请联系管理员！");
            return;
        }

        this.cardService.upUserCard(id, addCard, username).then(success => {
            alert(success ? "充值成功！" : "充值失败！");
            this.router.navigate(['../admin/card']);
        });
    }
}