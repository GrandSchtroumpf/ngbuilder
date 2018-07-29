import { Injectable, NgModule, Component } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { StyleService } from '../../style/services';
import { TemplateService } from './../../template/services';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  public module$: Observable<NgModule>;

  constructor(
    private style: StyleService,
    private template: TemplateService
  ) {
    /**
     * Modify module with a new Component on template / style change
     * TODO: Move to "Component" module when created
     */
    this.module$ = combineLatest(
      this.style.style$,
      this.template.template$
    ).pipe(
      // For dynamic class from string see:
      // https://www.stevefenton.co.uk/2014/07/creating-typescript-classes-dynamically/
      map(([css, html]) => ({template: html, styles: [css]})),
      map(cmpt => Component(cmpt)(class {})),
      map(cmpt => ({declarations: [cmpt]}))
    );
  }
}
