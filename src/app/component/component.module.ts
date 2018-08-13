import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared';

// NGRX
import { StoreModule } from '@ngrx/store';
import { reducer } from './+state';

// Containers
import { CmptListComponent } from './containers/cmpt-list/cmpt-list.component';
import { CmptSandboxComponent } from './containers/cmpt-sandbox/cmpt-sandbox.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    // StoreModule.forFeature('component', reducer),
  ],
  declarations: [CmptSandboxComponent, CmptListComponent]
})
export class ComponentModule { }
