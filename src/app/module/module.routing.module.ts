import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Internal components
import { ModuleSandboxComponent } from './containers/module-sandbox/module-sandbox.component';
import { ModuleEditorComponent } from './containers/module-editor/module-editor.component';

// External Components
// TODO : Use module
//  TREE
import { ModuleListComponent } from './containers/module-list/module-list.component';
import { CmptListComponent } from './../component/containers/cmpt-list/cmpt-list.component';
import { TemplateTreeComponent } from './../template/containers/template-tree/template-tree.component';

// VIEW
import { StyleEditorComponent } from './../style/containers/style-editor/style-editor.component';

export const routes: Routes = [
  {
    path: '',
    component: ModuleEditorComponent,
    children: [
      { path: '', redirectTo: 'sandbox', pathMatch: 'full'},
      { path: 'sandbox', component: ModuleSandboxComponent},
    ]
  },
  // Left
  { outlet: 'tree', path: '', component: ModuleListComponent },
  { outlet: 'tree', path: 'cmpt-list', component: CmptListComponent },
  { outlet: 'tree', path: 'template', component: TemplateTreeComponent },
  // Right
  { outlet: 'view', path: ':selector', component: StyleEditorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleRoutingModule {}
