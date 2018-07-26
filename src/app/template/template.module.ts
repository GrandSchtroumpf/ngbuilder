import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../shared/material.module';

// Containers
import { TemplateEditorComponent } from './containers/template-editor/template-editor.component';
import { TemplateElementComponent } from './components/template-element/template-element.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [TemplateEditorComponent, TemplateElementComponent]
})
export class TemplateModule { }
