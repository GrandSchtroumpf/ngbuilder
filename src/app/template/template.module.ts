import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule, UtilsModule } from '../shared';

// Containers
import { TemplateEditorComponent } from './containers/template-editor/template-editor.component';
import { TemplateElementComponent } from './components/template-element/template-element.component';
import { TemplateNodeComponent } from './components/template-node/template-node.component';
import { TemplateTreeComponent } from './containers/template-tree/template-tree.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    UtilsModule
  ],
  declarations: [TemplateEditorComponent, TemplateElementComponent, TemplateNodeComponent, TemplateTreeComponent]
})
export class TemplateModule { }
