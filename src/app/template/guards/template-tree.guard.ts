import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
// NGRX
import { Store, select } from '@ngrx/store';
import { State } from '../../core';
import { selectTemplate, ParseTemplate } from '../+state';

import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TemplateTreeGuard implements CanActivate {

  constructor(private store: Store<State>) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(selectTemplate),
      tap(template => this.store.dispatch(new ParseTemplate({template}))),
      map(() => true)
    );
  }
}
