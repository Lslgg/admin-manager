import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatepickerModule } from 'angular2-material-datepicker';

// Routing Module
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { AdminModule } from './admin/admin.module';
import { LoginComponent } from './admin/login/login.component';

//git 的项目请用
//import { ParserManager } from './common/ParserManager';

import { ParserManager } from './common/Parser';
import { CommonHttpApi } from './common/CommonHttpApi';
import { AuthGuard } from './admin/common/server/auth-guard.service';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DatepickerModule,
    AppRoutingModule,
    AdminModule
  ],
  declarations: [
    AppComponent,
    LoginComponent
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: 'parseManager', useClass: ParserManager },
    { provide: 'commonApi', useClass: CommonHttpApi },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
