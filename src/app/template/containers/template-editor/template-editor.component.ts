import { Router } from '@angular/router';
import { DefaultTreeDocumentFragment, DefaultTreeParentNode } from 'parse5';
import { Component, OnInit } from '@angular/core';
import { TemplateParser, TemplateBuilder } from './../../services';

@Component({
  selector: 'template-editor',
  templateUrl: './template-editor.component.html',
  styleUrls: ['./template-editor.component.css']
})
export class TemplateEditorComponent implements OnInit {

  public ast: DefaultTreeDocumentFragment;

  constructor(
    private router: Router,
    private builder: TemplateBuilder,
    private parser: TemplateParser
  ) { }

  ngOnInit() {
    this.ast = this.parser.ast;
  }

  public select(node: DefaultTreeParentNode) {
    this.router.navigate([{
      outlets: {right: ['']}
    }]);
  }

  public addNode(node: DefaultTreeParentNode) {
    node.childNodes.push(
      this.builder.createElement('h1', '', [])
    );
  }

  public addText(node) {
    node.childNodes.push(
      this.builder.createTextNode('Hello World')
    );
  }

  public save() {
    this.parser.save(this.ast);
  }

}
