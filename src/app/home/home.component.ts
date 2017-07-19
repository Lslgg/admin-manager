import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'home-home',
  styleUrls: ['./index/index.css'],
  template: ` 
      <div class="container-fluid mouseWheel"  (mouseWheelUp)="mouseWheelUpFunc()" (mouseWheelDown)="mouseWheelDownFunc()">
        <div class="content">
          <home-hader  #haderNav></home-hader>
          <router-outlet></router-outlet>
        </div>
      </div>
    `,
})

export class HomeComponent implements OnInit {

  urlList: Array<string> = ["/home", "/home/introduction", "/home/rule", "/home/about"];

  @ViewChild('haderNav') haderNavViewChild: ElementRef;

  constructor(private route: ActivatedRoute, private router: Router, ) { }

  ngOnInit() { }

  mouseWheelUpFunc() {
    var url = this.router.url;
    var nextUrl = "/home/about";
    for (var i = 0; i < this.urlList.length; i++) {
      if (this.urlList[i] == url) {
        if (this.urlList[i] != "/home") {
          nextUrl = this.urlList[i - 1];
        }
      }
    }
    this.haderNavViewChild["getNavLine"](nextUrl);
    this.router.navigate(['../' + nextUrl]);
  }

  mouseWheelDownFunc() {
    var url = this.router.url;
    var nextUrl = "/home";
    for (var i = 0; i < this.urlList.length; i++) {
      if (this.urlList[i] == url) {
        if (this.urlList[i] != "/home/about") {
          nextUrl = this.urlList[i + 1];
        }
      }
    }
    this.haderNavViewChild["getNavLine"](nextUrl);
    this.router.navigate(['../' + nextUrl]);
  }


}