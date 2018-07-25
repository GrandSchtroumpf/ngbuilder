import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../../environments/environment';

// External Module
import { ModuleModule } from '../module/module.module';

// NGRX
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducer } from './reducers';

// Contrainers
import { CoreLayoutComponent } from './containers/core-layout/core-layout.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ModuleModule,
    // NGRX
    StoreModule.forRoot(reducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  declarations: [CoreLayoutComponent],
  bootstrap: [CoreLayoutComponent]
})
export class CoreModule { }
