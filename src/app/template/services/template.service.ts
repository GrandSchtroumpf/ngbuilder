import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { TemplateParser } from '../utils';
import { TreeElement } from './../models';
import { serialize, parseFragment, DefaultTreeDocumentFragment, DefaultTreeElement } from 'parse5';
import { TemplateBuilder } from './template.builder';

const MOCK = `
  <main>
    <section>
      <h1>Hello Worl</h1>
    </section>
  </main>
  <footer>
    <div>
      <span>End</span>
    </div>
    <p>Toto</p>
  </footer>
`.trim();

@Injectable({ providedIn: 'root' })
export class TemplateService {

  private _tree = new BehaviorSubject<DefaultTreeDocumentFragment>(null);
  public tree$ = this._tree.asObservable();
  private _template = new BehaviorSubject<string>('');
  public template$ = this._template.asObservable();

  constructor(private builder: TemplateBuilder) {
    // TODO : remove
    this._tree.next(parseFragment(MOCK));
  }

  public updateTree() {
    this._tree.next(this._tree.getValue());
  }

  public save() {
    this._template.next(serialize(this._tree.getValue()));
  }

  public serialize(ast: DefaultTreeDocumentFragment) {
    return serialize(ast);
  }

}
