import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../../environments/environment';
import { CoreRoutingModule } from './core.routing.module';

// External Module
import { ModuleModule } from '../module/module.module';

// Contrainers
import { CoreLayoutComponent } from './containers/core-layout/core-layout.component';

// NGRX
import { reducers, metaReducers } from './reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { RouterSerializer } from './+state';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreRoutingModule,
    ModuleModule,
    // NGRX
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: RouterSerializer },
  ],
  declarations: [CoreLayoutComponent],
  bootstrap: [CoreLayoutComponent]
})
export class CoreModule { }
