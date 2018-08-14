import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule, UtilsModule } from '../shared';

// Containers
import { TemplateTreeComponent } from './containers/template-tree/template-tree.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './+state/reducer';
import { EffectsModule } from '@ngrx/effects';
import { TemplateEffects } from './+state/effects';
import { NodePickerComponent } from './components/node-picker/node-picker.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    UtilsModule,
    // StoreModule.forFeature('template', reducer),
    EffectsModule.forFeature([TemplateEffects])
  ],
  declarations: [TemplateTreeComponent, NodePickerComponent],
  exports: [NodePickerComponent]
})
export class TemplateModule { }
