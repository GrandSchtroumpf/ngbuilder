import { StyleCompiler } from './../utils/compiler';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Stylesheet } from './../models';
import { parse } from '../utils/parser';

@Injectable({
  providedIn: 'root'
})
export class StyleService {

  private _style$ = new BehaviorSubject<string>('');
  public style$ = this._style$.asObservable();
  private _ast$ = new BehaviorSubject<Stylesheet>(null);
  public ast$ = this._ast$.asObservable();

  constructor(private compiler: StyleCompiler) {
    this.ast = this.parse('');
  }

  public get ast() { return this._ast$.getValue(); }
  public set ast(ast: Stylesheet) { this._ast$.next(ast); }

  public save(ast: Stylesheet) {
    this._style$.next(this.compile(ast));
  }

  public parse(css: string): Stylesheet {
    return parse(css);
  }

  public compile(ast: Stylesheet) {
    return this.compiler.compile(ast);
  }

}
