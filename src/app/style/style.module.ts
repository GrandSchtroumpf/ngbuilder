import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Contrainers
import { StyleEditorComponent } from './contrainers/style-editor/style-editor.component';

// Components
import { StyleRuleComponent } from './components/style-rule/style-rule.component';
import { StyleDeclarationGroupComponent } from './components/style-declaration-group/style-declaration-group.component';
import { StyleDeclarationComponent } from './components/style-declaration/style-declaration.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    StyleEditorComponent,
    StyleRuleComponent,
    StyleDeclarationGroupComponent,
    StyleDeclarationComponent
  ],
  exports: [StyleEditorComponent]
})
export class StyleModule {}
