import { TemplateAst } from './../../services/template.ast';
import { DefaultTreeDocumentFragment, DefaultTreeParentNode } from 'parse5';
import { Component, OnInit } from '@angular/core';
import { TemplateParser } from './../../services';

@Component({
  selector: 'template-editor',
  templateUrl: './template-editor.component.html',
  styleUrls: ['./template-editor.component.css']
})
export class TemplateEditorComponent implements OnInit {

  public ast: DefaultTreeDocumentFragment;

  constructor(
    public astBuilder: TemplateAst,
    public parser: TemplateParser
  ) { }

  ngOnInit() {
    this.ast = this.parser.ast;
  }

  public addNode(node: DefaultTreeParentNode) {
    node.childNodes.push(
      this.astBuilder.createElement('h1', '', [])
    );
  }

  public addText(node) {
    node.childNodes.push(
      this.astBuilder.createTextNode('Hello World')
    );
  }

  public save() {
    this.parser.save(this.ast);
  }

}
