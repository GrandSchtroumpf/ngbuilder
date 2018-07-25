import { Injectable } from '@angular/core';
import { parse, stringify } from 'css';
import { Stylesheet } from './../models';

@Injectable({
  providedIn: 'root'
})
export class StyleParser {

  constructor() {}

  public parse(css: string): Stylesheet {
    return parse(css);
  }

  public stringify(ast: Stylesheet) {
    return stringify(ast);
  }

}
