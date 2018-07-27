import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Internal components
import { ModuleSandboxComponent } from './containers/module-sandbox/module-sandbox.component';
import { ModuleEditorComponent } from './containers/module-editor/module-editor.component';

// External Components
// TODO : Use module
import { TemplateEditorComponent } from '../template/containers/template-editor/template-editor.component';
import { StyleEditorComponent } from './../style/contrainers/style-editor/style-editor.component';

export const routes: Routes = [
  {
    path: '',
    component: ModuleEditorComponent,
    children: [
      { path: '', redirectTo: 'sandbox', pathMatch: 'full' },
      { path: 'sandbox', component: ModuleSandboxComponent}
    ]
  },
  // Left
  { outlet: 'tree', path: '', component: TemplateEditorComponent },
  // Right
  { outlet: 'view', path: ':selector', component: StyleEditorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleRoutingModule {}
