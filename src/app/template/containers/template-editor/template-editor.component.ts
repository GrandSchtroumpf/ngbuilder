import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DefaultTreeElement, Attribute } from 'parse5';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TemplateBuilder, TemplateService } from './../../services';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';

import { TAGS } from './../../models';
import { takeWhile, tap } from 'rxjs/operators';

@Component({
  selector: 'template-editor',
  templateUrl: './template-editor.component.html',
  styleUrls: ['./template-editor.component.css']
})
export class TemplateEditorComponent implements OnInit, OnDestroy {

  private alive = true;
  public tree$: Observable<any[]>;
  public selected: DefaultTreeElement;

  public treeControl: NestedTreeControl<DefaultTreeElement>;
  public treeDataSource: MatTreeNestedDataSource<DefaultTreeElement>;
  public tagList = TAGS;

  constructor(
    private router: Router,
    private builder: TemplateBuilder,
    private service: TemplateService
  ) { }


  ngOnInit() {
    this.treeControl = new NestedTreeControl(this.getChildren);
    this.treeDataSource = new MatTreeNestedDataSource();
    this.service.tree$.pipe(
      tap(tree => this.selected = this.selected ? this.selected : tree as DefaultTreeElement),
      takeWhile(() => this.alive)
    ).subscribe(tree => this.treeDataSource.data = tree.childNodes as DefaultTreeElement[]);
  }

  ngOnDestroy() {
    this.alive = false;
  }

  private getChildren = (node: DefaultTreeElement) => node.childNodes as DefaultTreeElement[];
  public hasChildren = (index: number, node: DefaultTreeElement) => !!node.childNodes;

  public select(node: DefaultTreeElement) {
    this.selected = node;
    this.router.navigate([{
      outlets: {view: [node.nodeName]}
    }]);
  }

  public addElement(name: string) {
    const el = this.builder.createElement(name, '', []);
    el.parentNode = this.selected;
    this.selected.childNodes.push(el);
    this.service.updateTree();
  }

  public save() {
    this.service.save();
  }
}
