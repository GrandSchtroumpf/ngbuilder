import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StyleBuilder, StyleParser } from '../../services';
import { Stylesheet } from '../../models';

@Component({
  selector: 'style-editor',
  templateUrl: './style-editor.component.html',
  styleUrls: ['./style-editor.component.css']
})
export class StyleEditorComponent implements OnInit {

  public ast: Stylesheet;
  public selector$: Observable<string>;

  constructor(
    private routes: ActivatedRoute,
    private builder: StyleBuilder,
    private parser: StyleParser
  ) { }

  ngOnInit() {
    this.ast = this.parser.ast;
    this.selector$ = this.routes.paramMap.pipe(
      map(params => params.get('selector'))
      // TODO: get rule or create one
    );
  }

  public addColor(color: string) {
    console.log('color', color);
    const rule = this.builder.createRule(
      ['h1'],
      [this.builder.createDeclaration('color', color)]
    );
    this.ast.stylesheet.rules.push(rule);
  }

  public save() {
    this.parser.save(this.ast);
  }
}
