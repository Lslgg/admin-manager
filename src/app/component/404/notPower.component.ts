import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'admin-notPower',
    template: ` 
        <div class="flex-row align-items-center">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-md-6">
                <div class="clearfix">
                  <h1 class="float-left display-3 mr-2">没有权限</h1>
                  <h4 class="pt-1">对不起您没有权限访问该页面！</h4>
                  <p class="text-muted">对不起您没有权限访问该页面！</p>
                </div>
              </div>
            </div>
          </div>
       </div>
    `
})

export class NotPowerComponent implements OnInit {

    constructor() { }

    ngOnInit() { }
}