import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared';

// Contrainers
import { StyleEditorComponent } from './containers/style-editor/style-editor.component';
import { StyleGroupComponent } from './containers/style-group/style-group.component';
import { StyleBackgroundComponent } from './containers/style-background/style-background.component';

// Components

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    StyleEditorComponent,
    StyleGroupComponent,
    StyleBackgroundComponent,
  ],
  exports: [StyleEditorComponent]
})
export class StyleModule {}
