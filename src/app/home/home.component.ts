import { Component, OnInit } from '@angular/core';
import { routerTransition } from './animations/router.animation'

@Component({
  selector: 'home-home',
  styles: [`
        .container-fluid{
          padding:0px;
        }
        .content{
            max-width:1200px;
            margin:auto;
        }
    `],
  template: ` 
      <div class="container-fluid">
        <div class="content">
          <home-hader></home-hader>
          <router-outlet></router-outlet>
        </div>
      </div>
    `,
  // animations: [routerTransition()],
  // host: { '[@routerTransition]': '' }
})

export class HomeComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}