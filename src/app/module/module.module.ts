import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared';

import { ModuleEditorComponent } from './containers/module-editor/module-editor.component';
import { StyleModule } from '../style/style.module';
import { TemplateModule } from '../template/template.module';
import { ModuleSandboxComponent } from './components/module-sandbox/module-sandbox.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    StyleModule,
    TemplateModule
  ],
  declarations: [ModuleEditorComponent, ModuleSandboxComponent],
  exports: [ModuleEditorComponent],
})
export class ModuleModule { }
