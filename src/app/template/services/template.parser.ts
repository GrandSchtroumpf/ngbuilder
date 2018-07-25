import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { serialize, parseFragment, DefaultTreeDocumentFragment } from 'parse5';

@Injectable({
  providedIn: 'root'
})
export class TemplateParser {

  private _template = new BehaviorSubject<string>('');
  public template$ = this._template.asObservable();

  public ast: DefaultTreeDocumentFragment;

  constructor() {
    this.ast = this.parseFragment('');
  }

  public save(ast: DefaultTreeDocumentFragment) {
    this._template.next(serialize(ast));
  }

  public serialize(ast: DefaultTreeDocumentFragment) {
    return serialize(ast);
  }

  public parseFragment(template: string): DefaultTreeDocumentFragment {
    return parseFragment(template);
  }
}
