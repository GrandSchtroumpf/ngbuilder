import { Rule } from './../../models/nodes';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { StyleBuilder, StyleService } from '../../services';
import { Stylesheet } from '../../models';
import { styleGroups } from './../../utils';

@Component({
  selector: 'style-editor',
  templateUrl: './style-editor.component.html',
  styleUrls: ['./style-editor.component.css']
})
export class StyleEditorComponent implements OnInit {

  public ast: Stylesheet;
  public rule$: Observable<Rule>;
  public groups = styleGroups;

  constructor(
    private routes: ActivatedRoute,
    private builder: StyleBuilder,
    private service: StyleService
  ) { }

  ngOnInit() {
    this.ast = this.service.ast;
    this.rule$ = combineLatest(
      this.routes.paramMap,
      this.service.ast$
    ).pipe(
      map(([params, ast]) => {
        const selector = params.get('selector');
        const rule = ast.stylesheet.rules.find(r => r.selectors.includes(selector));
        return rule ? rule : this.builder.createRule([selector]);
      })
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
    this.service.save(this.ast);
  }
}
