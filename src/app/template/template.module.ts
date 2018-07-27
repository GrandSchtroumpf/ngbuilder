import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule, UtilsModule } from '../shared';

// Containers
import { TemplateEditorComponent } from './containers/template-editor/template-editor.component';
import { TemplateElementComponent } from './components/template-element/template-element.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    UtilsModule
  ],
  declarations: [TemplateEditorComponent, TemplateElementComponent]
})
export class TemplateModule { }
