import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { State } from '../../../core';
import { Observable } from 'rxjs';
import { TemplateService } from './../../services';

import { TreeElement, TAGS } from './../../models';
import { selectTemplate } from '../../+state';

@Component({
  selector: 'template-tree',
  templateUrl: './template-tree.component.html',
  styleUrls: ['./template-tree.component.css']
})
export class TemplateTreeComponent implements OnInit {

  public tree$: Observable<TreeElement[]>;
  public selected$: Observable<number>;
  public tagList = TAGS;


  constructor(
    private store: Store<State>,
    private service: TemplateService,
    private router: Router
  ) {}

  ngOnInit() {
    const tree = this.service.tree;
    this.checkChildrenVisbility(tree, tree[0]);
    this.service.tree = tree;
    this.tree$ = this.service.tree$;
    this.selected$ = this.service.selected$;
  }

  public select(index: number) {
    this.service.selected = index;
    this.router.navigate([{
      outlets: {view: [this.service.tree[index].name]}
    }]);
  }

  /**
   * Toggle the node and check all children nodes
   */
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
    const tree = this.service.addElement(tag);
    this.checkChildrenVisbility(tree, tree[0]);
    this.service.tree = tree;
  }

  /**
   *
   */
  public compile() {
    this.service.updateTemplate();
  }
}
