import { Injectable } from '@angular/core';
import { Parser } from 'htmlparser2';
import { TreeElement, Attributes } from './../models';

@Injectable({ providedIn: 'root' })
export class TemplateParser {

  private parser: Parser;
  private index: number;
  private level: number;
  private tree: TreeElement[];
  private opened: number[];

  constructor() {

    this.parser = new Parser({
      onopentag: (name: string, att: Attributes) => {
        this.index++;
        this.level++;
        this.opened.push(this.index);
        this.tree.push({name, att, children: [], index: this.index});
      },
      ontext: (text: string) => {
        // TODO: Supprimer les espaces et \n\t ...
        this.tree[this.tree.length - 1].text = text;
      },
      onclosetag: (name: string) => {
        this.level--;
        const last = this.opened.pop();
        const lastOpenIndex = this.opened[this.opened.length - 1];
        this.tree[last].parent = lastOpenIndex;
        this.tree[last].level = this.level;
        this.tree[lastOpenIndex].children.push(last);
      },
      onreset: () => {
        this.init();
      }
    }, {decodeEntities: true});
  }

  private init() {
    this.index = 0;
    this.level = 0;
    this.tree = [{name: 'root', att: {}, children: [], index: 0}];
    // i, is the ref to the index of this node in "tree"
    this.opened = [0];
  }

  public parse(template: string) {
    this.parser.reset();
    this.init();
    this.parser.write(template);
    return this.tree;
  }
}
