import { ModuleEditorComponent } from './containers/module-editor/module-editor.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// External Components
// TODO : Use module
import { TemplateEditorComponent } from '../template/containers/template-editor/template-editor.component';
import { StyleEditorComponent } from './../style/contrainers/style-editor/style-editor.component';

export const routes: Routes = [
  { path: '', component: ModuleEditorComponent },
  { outlet: 'left', path: '', component: TemplateEditorComponent },
  { outlet: 'right', path: '', component: StyleEditorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleRoutingModule {}
