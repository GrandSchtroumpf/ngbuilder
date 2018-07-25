import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../shared/material.module';

// Containers
import { TemplateEditorComponent } from './containers/template-editor/template-editor.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [TemplateEditorComponent]
})
export class TemplateModule { }
