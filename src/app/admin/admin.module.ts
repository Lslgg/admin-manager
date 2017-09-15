//core
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { HttpModule, Jsonp, URLSearchParams } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { CommonModule as SystemCommonModule } from '@angular/common';
import { AuthGuard } from './common/server/auth-guard.service';

//third
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DatepickerModule } from 'angular2-material-datepicker';
//admin
import { AdminComponent } from './admin.component';
import { HeaderComponent, FooterComponent, SidebarComponent } from './layouts';
import { AdminRoutingModule, ComponentList } from './admin.routing';

//admin common template
import { TemplateModule } from './common/template';

//custom
import { BreadcrumbsComponent } from '../component';
import { TableModule } from '../component/table/table.module';
import { DataFormModule } from '../component/dataform';
import { TreeModule } from '../component/tree';
import { DataModalModule } from '../component/dataModal';
import { FontawesomeModule } from '../component/fontawesome';

import { CheckedPipe, KeysPipe} from './power/shared/power.pipe';

import { SIDEBAR_TOGGLE_DIRECTIVES, NAV_DROPDOWN_DIRECTIVES, 
  AsideToggleDirective,EqualValidator } from './common/directive';

let directive=[
  SIDEBAR_TOGGLE_DIRECTIVES, NAV_DROPDOWN_DIRECTIVES, 
  AsideToggleDirective,EqualValidator
];


@NgModule({
  imports: [
    SystemCommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DatepickerModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    AdminRoutingModule,
    DataFormModule,    
    TemplateModule,
    TableModule,
    TreeModule,
    DataModalModule,
    FontawesomeModule
  ],
  declarations: [
    directive,
    AdminComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    ComponentList,
    CheckedPipe,
    KeysPipe
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    AuthGuard
  ],
  bootstrap: [
    AdminComponent
  ]
})

export class AdminModule { }
