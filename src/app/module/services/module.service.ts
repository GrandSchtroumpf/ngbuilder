import { Injectable, NgModule, Component, Type } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { StyleParser } from '../../style/services/style.parser';
import { TemplateParser } from './../../template/services/template.parser';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  public module$: Observable<NgModule>;

  constructor(
    private style: StyleParser,
    private template: TemplateParser
  ) {
    /**
     * Modify module with a new Component on template / style change
     * TODO: Move to "Component" module when created
     */
    this.module$ = combineLatest(
      this.style.style$,
      this.template.template$
    ).pipe(
      map(([css, html]) => ({template: html, styles: [css]})),
      map(cmpt => Component(cmpt)(class {})),
      map(cmpt => ({declarations: [cmpt]}))
    );
  }

}
