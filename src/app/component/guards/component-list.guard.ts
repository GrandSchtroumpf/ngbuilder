import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
// NGRX
import { Store, select } from '@ngrx/store';
import { selectCurrentModule, SelectModule } from './../../module/+state';
import { selectModuleName } from './../../core/+state';
import { State } from '../../core';

import { Observable, combineLatest, of } from 'rxjs';
import { first, tap, filter, switchMap, catchError } from 'rxjs/operators';
import { IModuleFile, ModuleFile } from './../../module/models/module';

@Injectable({
  providedIn: 'root'
})
export class ComponentListGuard implements CanActivate {

  constructor(
    private router: Router,
    private store: Store<State>
  ) {}

  canActivate(): Observable<boolean> {
    return combineLatest([
      this.store.pipe(select(selectModuleName)),
      this.store.pipe(select(selectCurrentModule)),
    ]).pipe(
      tap(([name, module]: [string, IModuleFile]) => {
        if (!name) {
          this.router.navigate(['/']);
        }
        if (!module || name !== module.name) {
          const path = new ModuleFile(name).path;
          this.store.dispatch(new SelectModule({path}));
        }
      }),
      filter(([name, module]) => !!name && !!module),
      first(),
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }
}
