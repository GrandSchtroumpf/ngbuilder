import { NgModule } from '@angular/core';

import {FlexLayoutModule} from '@angular/flex-layout';
import {MatSidenavModule} from '@angular/material/sidenav';


@NgModule({
  imports: [
    FlexLayoutModule,
    MatSidenavModule
  ],
  exports: [
    FlexLayoutModule,
    MatSidenavModule
  ]
})
export class MaterialModule {}
