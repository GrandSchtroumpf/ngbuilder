import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { serialize, parseFragment } from 'parse5';

@Injectable({
  providedIn: 'root'
})
export class TemplateParser {

  private _template = new BehaviorSubject<string>('');
  public template$ = this._template.asObservable();

  constructor() {}

  public save(ast: Node) {
    this._template.next(serialize(ast));
  }

  public serialize(ast: Node) {
    return serialize(ast);
  }

  public parseFragment(template: string) {
    return parseFragment(template);
  }
}
