import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { parse, stringify } from 'css';
import { Stylesheet } from './../models';

@Injectable({
  providedIn: 'root'
})
export class StyleParser {

  private _style = new BehaviorSubject<string>('');
  public style$ = this._style.asObservable();

  constructor() {}

  public save(ast: Stylesheet) {
    this._style.next(stringify(ast));
  }

  public parse(css: string): Stylesheet {
    return parse(css);
  }

  public stringify(ast: Stylesheet) {
    return stringify(ast);
  }

}
