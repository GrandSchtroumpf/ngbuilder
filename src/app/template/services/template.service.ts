import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { serialize, parseFragment, DefaultTreeDocumentFragment } from 'parse5';

const MOCK = '<main><section><h1>Hello World</h1></section></main>';

@Injectable({ providedIn: 'root' })
export class TemplateService {

  private _tree = new BehaviorSubject<DefaultTreeDocumentFragment>(null);
  public tree$ = this._tree.asObservable();
  private _template = new BehaviorSubject<string>('');
  public template$ = this._template.asObservable();

  constructor() {
    this._tree.next(parseFragment(MOCK));
  }

  /** Update the tree */
  public updateTree() {
    this._tree.next({...this._tree.getValue()});
  }

  /** Update the template */
  public updateTemplate() {
    this._template.next(serialize(this._tree.getValue()));
  }

  public serialize(ast: DefaultTreeDocumentFragment) {
    return serialize(ast);
  }

}
