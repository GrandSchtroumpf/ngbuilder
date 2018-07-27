import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NestedMenuComponent } from './nested-menu/nested-menu.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [NestedMenuComponent],
  exports: [NestedMenuComponent]
})
export class UtilsModule { }
