import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// NGRX
import { Store, select } from '@ngrx/store';
import { State } from '../../../core';
import { TemplateService } from './../../services';
import { CompileTree,  SelectElement, AddElement } from '../../+state/actions';
import { selectTree, selectCurrentId } from '../../+state/selectors';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TreeElement, TAGS } from './../../models';

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
    /*
    const tree = this.service.tree;
    this.checkChildrenVisbility(tree, tree[0]);
    this.service.tree = tree;
    */
    this.tree$ = this.store.pipe(
      select(selectTree),
      map(tree => this.checkChildrenVisbility(tree, tree[0]))
    ); // this.service.tree$;
    this.selected$ = this.store.pipe(select(selectCurrentId));
    // this.selected$ = this.service.selected$;
  }

  public select(index: number) {
    this.store.dispatch(new SelectElement({index}));
    /*
    this.service.selected = index;
    this.router.navigate([{
      outlets: {view: [this.service.tree[index].name]}
    }], {queryParamsHandling: 'merge'});
    */
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
      return !!child.parent
        ? tree[child.parent].expanded && isParentExpanded(tree[child.parent])
        : true;
    };
    node.visible = !node.parent || isParentExpanded(node);
  }

  /**
   * Check the visibility of all children
   * @param tree The whole tree
   * @param node The parent node to check the children.
   */
  public checkChildrenVisbility(tree: TreeElement[], node: TreeElement): TreeElement[] {
    node.children.forEach(child => {
      this.setVisible(tree, tree[child]);
      if (tree[child].children.length > 0) {
        this.checkChildrenVisbility(tree, tree[child]);
      }
    });
    return tree;
  }

  /**
   * Add an Element in the tree and update it
   * @param tag The name of the Element to add
   */
  public addElement(tag: string) {
    this.store.dispatch(new AddElement({tag}));
    /*
    const tree = this.service.addElement(tag);
    this.checkChildrenVisbility(tree, tree[0]);
    this.service.tree = tree;
    */
  }

  /**
   *
   */
  public compile(tree: TreeElement[]) {
    this.store.dispatch(new CompileTree({tree}));
    // this.service.updateTemplate();
  }
}
