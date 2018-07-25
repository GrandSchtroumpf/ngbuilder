import { Injectable, NgModule, Component, Type } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { StyleParser } from '../../style/services/style.parser';
import { TemplateParser } from './../../template/services/template.parser';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  private _module = new BehaviorSubject<NgModule>(null);

  constructor(
    private style: StyleParser,
    private template: TemplateParser
  ) {
    /** Modify module with a new Component on template / style change */
    combineLatest(
      this.style.style$,
      this.template.template$
    ).pipe(
      map(([css, html]) => ({template: html, styles: [css]})),
      map(cmpt => Component(cmpt)(class {}))
    ).subscribe((component: Type<any>) => {
      this._module.next({declarations: [component]});
    });
  }

}
