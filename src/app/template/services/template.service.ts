import { TreeElement } from './../models/nodes';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { TemplateParser, TemplateCompiler } from '../utils';

const MOCK = '<main><section><h1>Hello World</h1><h2>Toto</h2></section></main><nav></nav>';

@Injectable({ providedIn: 'root' })
export class TemplateService {

  private _tree$ = new BehaviorSubject<TreeElement[]>(null);
  public tree$ = this._tree$.asObservable();
  private _template$ = new BehaviorSubject<string>('');
  public template$ = this._template$.asObservable();
  private _selected$ = new BehaviorSubject<number>(0);
  public selected$ = this._selected$.asObservable();

  constructor(private parser: TemplateParser, private compiler: TemplateCompiler) {
    this.tree = this.parser.parse(MOCK);
  }

  public get tree() { return this._tree$.getValue(); }
  public set tree(tree: TreeElement[]) { this._tree$.next([...tree]); }
  public get template() { return this._template$.getValue(); }
  public set template(template: string) { this._template$.next(template); }
  public get selected() { return this._selected$.getValue(); }
  public set selected(index: number) { this._selected$.next(index); }


  /** Update the template */
  public updateTemplate() {
    this.template = this.compiler.compile(this.tree);
  }

  /**
   * Add an Element in the tree and update it
   * @param tag The name of the Element to add
   */
  public addElement(tag: string): TreeElement[] {
    const tree = [...this.tree];

    // Recusive function to get the index of the last child
    const getLastIndex = (node: TreeElement, nodeIndex: number) => {
      if (node.children.length === 0) {
        return nodeIndex + 1;
      } else {
        const lastChild = node.children[node.children.length - 1];
        const childNode = tree[lastChild];
        return childNode.children.length === 0 ? lastChild + 1 : getLastIndex(childNode, lastChild);
      }
    };

    const parent = tree[this.selected];
    const newIndex = getLastIndex(parent, this.selected);
    const child = {
      name: tag,
      att: {},
      children: [],
      level: parent.level + 1,
      parent: this.selected,
      index: newIndex
    };
    // Update all parent and children affected
    tree.forEach((node, i) => {
      // Add 1 to all node parent after this index
      if (i >= newIndex && node.parent >= newIndex) {
        node.parent++;
      }
      // Add 1 to all node children after this index
      if (i >= newIndex && node.children.length > 0) {
        node.children = node.children.map(c => ++c);
      }
      // Add 1 for children that equal the new index
      if (node.children.length > 0 && !!node.children.find(c => c === newIndex)) {
        node.children = node.children.map(c => (c === newIndex) ? ++c : c);
      }
    });
    parent.children.push(newIndex);
    tree.splice(newIndex, 0, child);
    return tree;
  }
}
