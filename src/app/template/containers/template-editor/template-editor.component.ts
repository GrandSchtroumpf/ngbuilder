import { Router } from '@angular/router';
import { DefaultTreeDocumentFragment, DefaultTreeElement, DefaultTreeNode } from 'parse5';
import { Component, OnInit, HostListener } from '@angular/core';
import { TemplateParser, TemplateBuilder } from './../../services';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';

import { TAGS } from './../../models';

@Component({
  selector: 'template-editor',
  templateUrl: './template-editor.component.html',
  styleUrls: ['./template-editor.component.css']
})
export class TemplateEditorComponent implements OnInit {

  public ast: DefaultTreeDocumentFragment;
  public treeControl: NestedTreeControl<DefaultTreeElement>;
  public treeDataSource: MatTreeNestedDataSource<DefaultTreeElement>;
  public selected: DefaultTreeElement;
  public tagList = TAGS;

  constructor(
    private router: Router,
    private builder: TemplateBuilder,
    private parser: TemplateParser
  ) { }


  ngOnInit() {
    this.ast = this.parser.ast;
    this.selected = this.ast as DefaultTreeElement;
    this.treeDataSource = new MatTreeNestedDataSource();
    this.treeControl = new NestedTreeControl(this.getNodeChildren);
    // TODO : subscription
    this.treeDataSource.data = this.ast.childNodes as DefaultTreeElement[];
  }

  @HostListener('click') clickOutside() { this.selected = this.ast as DefaultTreeElement; }

  private getNodeChildren(node: DefaultTreeElement) { return node.childNodes as DefaultTreeElement[]; }

  public hasChildren(index: number, node: DefaultTreeElement) {
    return node.childNodes
    && node.childNodes.length > 0
    && node.childNodes.every(child => (child.nodeName !== '#text') && (child.nodeName !== '#comment'));
  }

  public select(node: DefaultTreeElement) {
    this.selected = node;
    this.router.navigate([{
      outlets: {view: [node.nodeName]}
    }]);
  }

  public addElement(node: DefaultTreeElement, tag: string) {
    node.childNodes.push(
      this.builder.createElement(tag, '', [])
    );
    this.treeDataSource.data = this.ast.childNodes as DefaultTreeElement[];
  }

  public save() {
    this.parser.save(this.ast);
  }

}
