import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule, UtilsModule } from '../shared';

// Containers
import { TemplateTreeComponent } from './containers/template-tree/template-tree.component';
import { StoreModule } from '@ngrx/store';
import * as fromTemplate from './+state/template.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TemplateEffects } from './+state/template.effects';
import { NodePickerComponent } from './components/node-picker/node-picker.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    UtilsModule,
    StoreModule.forFeature('template', fromTemplate.reducer),
    EffectsModule.forFeature([TemplateEffects])
  ],
  declarations: [TemplateTreeComponent, NodePickerComponent],
  exports: [NodePickerComponent]
})
export class TemplateModule { }
