import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleRoutingModule } from './module.routing.module';
import { MaterialModule } from '../shared';

import { ComponentModule } from '../component/component.module';
import { StyleModule } from '../style/style.module';
import { TemplateModule } from '../template/template.module';

// Containers
import { ModuleEditorComponent } from './containers/module-editor/module-editor.component';
import { ModuleSandboxComponent } from './containers/module-sandbox/module-sandbox.component';
import { ModuleListComponent } from './containers/module-list/module-list.component';

// NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromModule from './+state';
import { ModuleViewComponent } from './components/module-view/module-view.component';

// Components

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ModuleRoutingModule,
    ComponentModule,
    StyleModule,
    TemplateModule,
    // StoreModule.forFeature('modules', fromModule.reducer),
  ],
  declarations: [ModuleEditorComponent, ModuleSandboxComponent, ModuleListComponent, ModuleViewComponent],
  exports: [ModuleEditorComponent],
})
export class ModuleModule { }
