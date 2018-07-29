import { map, tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { TreeElement, TAGS } from './../../models';
import { TemplateParser } from '../../utils';

@Component({
  selector: 'app-template-tree',
  templateUrl: './template-tree.component.html',
  styleUrls: ['./template-tree.component.css']
})
export class TemplateTreeComponent implements OnInit {

  private _tree$ = new BehaviorSubject<TreeElement[]>(null);
  public tree$ = this._tree$.asObservable();
  public selected = 0;
  public tagList = TAGS;

  public counter = 0;

  constructor(private parser: TemplateParser) {}

  ngOnInit() {
    this._tree$.next(this.parser.parse('<main><h1>Hello World</h1></main><section><nav></nav></section>'));
  }

  public toggle(node: TreeElement) { node.expanded = !node.expanded; }

  public visible(node: TreeElement) {
    // TODO: check only when click on parent
    const tree = this._tree$.getValue();
    console.log('check', this.counter++);
    const isParentExpanded = (child: TreeElement) => {
      return !!child.parent ? tree[child.parent].expanded && isParentExpanded(tree[child.parent]) : true;
    };
    return !node.parent || isParentExpanded(node);
  }

  /**
   * Add an Element in the tree and update it
   * @param tag The name of the Element to add
   */
  public addElement(tag: string) {
    const tree = this._tree$.getValue();

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
    const child = { name: tag, att: {}, children: [], level: parent.level + 1, parent: this.selected };
    const newIndex = getLastIndex(parent, this.selected);
    parent.children.push(newIndex);
    // Change parents from node that pointer to the index of the new node
    tree.filter(node => node.parent === newIndex).forEach(node => node.parent = newIndex + 1);
    tree.splice(newIndex, 0, child);
    this._tree$.next([...tree]);
  }
}
