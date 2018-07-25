import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleRoutingModule } from './module.routing.module';
import { MaterialModule } from '../shared';

import { StyleModule } from '../style/style.module';
import { TemplateModule } from '../template/template.module';
// Containers
import { ModuleEditorComponent } from './containers/module-editor/module-editor.component';
// Components
import { ModuleSandboxComponent } from './components/module-sandbox/module-sandbox.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ModuleRoutingModule,
    StyleModule,
    TemplateModule
  ],
  declarations: [ModuleEditorComponent, ModuleSandboxComponent],
  exports: [ModuleEditorComponent],
})
export class ModuleModule { }
