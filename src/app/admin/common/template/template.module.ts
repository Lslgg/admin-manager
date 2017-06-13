import { NgModule } from '@angular/core';
import { CommonModule as SysteCommonModule } from '@angular/common';
import { TemplateComponent } from './template.component';
import { ToggleDirective } from './directive/toggle.directive';

import { 
    PanelTableComponent, 
    PanelFormComponent 
} from './component/index';

@NgModule({
    imports: [
        SysteCommonModule,
    ],
    declarations: [
        TemplateComponent,
        PanelTableComponent,
        PanelFormComponent,
        ToggleDirective
    ],
    exports:[
        TemplateComponent,
        PanelTableComponent,
        PanelFormComponent
    ],
    bootstrap: [TemplateComponent],
})
export class TemplateModule { }
