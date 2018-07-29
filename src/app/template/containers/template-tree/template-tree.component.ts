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
    const tree = this.parser.parse('<main><h1>Hello World</h1></main><section><nav></nav></section>');
    this.checkChildrenVisbility(tree, tree[0]);
    this._tree$.next(tree);
  }

  public toggle(tree: TreeElement[], node: TreeElement) {
    node.expanded = !node.expanded;
    this.checkChildrenVisbility(tree, node);
  }

  /**
   * Set the visibility of a node depending on its parent
   * @param tree The whole tree
   * @param node The node to check the visibility of
   */
  private setVisible(tree: TreeElement[], node: TreeElement) {
    // TODO: check only when click on parent
    const isParentExpanded = (child: TreeElement) => {
      return !!child.parent ? tree[child.parent].expanded && isParentExpanded(tree[child.parent]) : true;
    };
    node.visible = !node.parent || isParentExpanded(node);
  }

  /**
   * Check the visibility of all children
   * @param tree The whole tree
   * @param node The parent node to check the children.
   */
  public checkChildrenVisbility(tree: TreeElement[], node: TreeElement) {
    node.children.forEach(child => {
      this.setVisible(tree, tree[child]);
      if (tree[child].children.length > 0) { this.checkChildrenVisbility(tree, tree[child]); }
    });
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
    // Update all parent and children affected
    tree.forEach((node, i) => {
      if (i >= newIndex && node.parent >= newIndex) {
        node.parent++;
      }
      if (i >= newIndex && node.children.length > 0) {
        node.children = node.children.map(c => ++c);
      }
      if (node.children.length > 0 && !!node.children.find(c => c === newIndex)) {
        node.children = node.children.map(c => (c === newIndex) ? ++c : c);
      }
    });
    parent.children.push(newIndex);
    tree.splice(newIndex, 0, child);
    this.checkChildrenVisbility(tree, tree[0]);
    this._tree$.next([...tree]);
  }
}
