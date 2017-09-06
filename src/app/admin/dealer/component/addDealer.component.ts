import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DealerService, Dealer } from "../shared";

@Component({
    selector: 'admin-add-dealer',
    templateUrl: 'addDealer.html',
    providers: [DealerService]
})

export class AddDealerComponent implements OnInit {

    dealerForm: FormGroup;

    constructor(private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private dealerService: DealerService) {
        this.createForm()
        let id = this.route.snapshot.params['id'];
        if (id != undefined) {
            this.dealerService.getInfo(id).then(info => {
                this.dealerForm.setValue({
                    Id: info.Id,
                    Name: info.Name,
                    Code: info.Code
                });
                this.dealerForm.controls["Code"].disable();
            })
        }
    }

    ngOnInit() { }

    createForm() {
        this.dealerForm = this.fb.group({
            Id: [0, [Validators.required]],
            Name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(12)]],
            Code: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
        });
    }

    onSubmit(formInfo: object) {
        let dealer=new Dealer();
        Object.assign(dealer,formInfo);
        if(dealer.Id){
            this.dealerService.update(dealer).then(success=>{
                alert(success ? "修改成功！" : "修改失败!");
                this.router.navigate(['../admin/dealer']);
            })
            return;
        }
        this.dealerService.addDealer(dealer).then(success=>{
            alert(success ? "添加成功！" : "添加失败!");
            this.router.navigate(['../admin/dealer']);
        }).catch(err=>{
            alert("推荐码重复,添加失败!");
        });

        return;
    }
}