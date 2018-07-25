import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleRoutingModule } from './module.routing.module';
import { MaterialModule } from '../shared';

import { StyleModule } from '../style/style.module';
import { TemplateModule } from '../template/template.module';
// Containers
import { ModuleEditorComponent } from './containers/module-editor/module-editor.component';
import { ModuleSandboxComponent } from './containers/module-sandbox/module-sandbox.component';
import { ModuleListComponent } from './containers/module-list/module-list.component';

// Components

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ModuleRoutingModule,
    StyleModule,
    TemplateModule
  ],
  declarations: [ModuleEditorComponent, ModuleSandboxComponent, ModuleListComponent],
  exports: [ModuleEditorComponent],
})
export class ModuleModule { }
