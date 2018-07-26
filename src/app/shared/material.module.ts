import { NgModule } from '@angular/core';

import {FlexLayoutModule} from '@angular/flex-layout';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [
    FlexLayoutModule,
    MatSidenavModule,
    MatListModule,
    MatTreeModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule
  ],
  exports: [
    FlexLayoutModule,
    MatSidenavModule,
    MatListModule,
    MatTreeModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class MaterialModule {}
