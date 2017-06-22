//core
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { HttpModule, Jsonp, URLSearchParams } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { CommonModule as SystemCommonModule } from '@angular/common';

//third
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

//admin
import { HeaderComponent, FooterComponent, SidebarComponent } from './layouts';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule, ComponentList } from './admin.routing';

//admin common template
import { TemplateModule } from './common/template';

//custom
import { BreadcrumbsComponent } from '../component';
import { TableModule } from '../component/table/table.module';
import { DataFormModule } from '../component/dataform';
import { TreeModule } from '../component/tree';
import { DataModalModule } from '../component/dataModal';


import { SIDEBAR_TOGGLE_DIRECTIVES, NAV_DROPDOWN_DIRECTIVES, 
  AsideToggleDirective } from './common/directive';

let directive=[
  SIDEBAR_TOGGLE_DIRECTIVES, NAV_DROPDOWN_DIRECTIVES, 
  AsideToggleDirective
];


@NgModule({
  imports: [
    SystemCommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    AdminRoutingModule,
    DataFormModule,    
    TemplateModule,
    TableModule,
    TreeModule,
    DataModalModule
  ],
  declarations: [
    directive,
    AdminComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    ComponentList
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
  ],
  bootstrap: [
    AdminComponent
  ]
})

export class AdminModule { }
