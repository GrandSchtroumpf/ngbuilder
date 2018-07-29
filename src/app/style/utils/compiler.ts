import {
  Node,
  Stylesheet,
  Comment,
  AtMedia,
  AtDocument,
  AtCharset,
  AtNamespace,
  AtSupports,
  AtKeyframes,
  Keyframe,
  AtPage,
  AtHost,
  AtFontFace,
  AtCustomMedia,
  Rule,
  Declaration,
  AtImport
} from '../models';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StyleCompiler {

  /**
   * Generic function to visit a node depending on its type
   * @param node The node to visit
   */
  private visit<T extends Node>(node: T) {
    return this[node.type](node);
  }

  /**
   * Map visit over array of `nodes`, optionally using a `delim`
   */
  private mapVisit(nodes: Node[], delim = '') {
    return nodes.reduce((acc: string, node: Node, i: number) => {
      acc += this.visit(node);
      if (i < nodes.length - 1) {
        acc += delim;
      }
      return acc;
    }, '');
  }

  public compile(node: Node) {
    switch (node.type) {
      case 'stylesheet':
        return this.stylesheet(node as Stylesheet);
    }
  }

  public stylesheet({ stylesheet }: Stylesheet) {
    return this.mapVisit(stylesheet.rules, '\n\n');
  }

  public comment({ comment }: Comment) {
    return `/* ${comment} */`;
  }

  public import(node: AtImport) {
    return `@import ${node.import};`;
  }

  public media({ media, rules }: AtMedia) {
    return `@media ${media} {\t${this.mapVisit(rules, '\n\n')}\n}`;
  }

  public document({ vendor, document, rules }: AtDocument) {
    const doc = `@${vendor || ''}document ${document}`;
    return `${doc} {\n\t${this.mapVisit(rules, '\n\n')}\n}`;
  }

  public charset({ charset }: AtCharset) {
    return `@charset ${charset};`;
  }

  public namespace({ namespace }: AtNamespace) {
    return `@namespace ${namespace};`;
  }

  public supports({ supports, rules }: AtSupports) {
    return `@supports ${supports} {\n\t${this.mapVisit(rules, '\n\n')}\n}`;
  }

  public keyframes({ vendor, keyframes }: AtKeyframes) {
    return `@${vendor || ''}keyframes {\n${this.mapVisit(keyframes, '\n')}\n}`;
  }

  public keyframe({ declarations, values }: Keyframe) {
    const decls = declarations;
    return `\t${values.join(', ')} {\n\t${this.mapVisit(decls, '\n')}\n\t}\n`;
  }

  public page({ selectors, declarations }: AtPage) {
    const sel = selectors.length ? selectors.join(', ') + ' ' : '';
    return `@page ${sel} {\n\t${this.mapVisit(declarations, '\n')}\n}`;
  }

  public ['font-face']({ declarations }: AtFontFace) {
    return `@font-face {\n\t${this.mapVisit(declarations, '\n')}\n}`;
  }

  public host({ rules }: AtHost) {
    return `@hotst {\n\t${this.mapVisit(rules, '\n\n')}\n}`;
  }

  public ['custom-media']({ name, media }: AtCustomMedia) {
    return `@custom-media ${name} ${media};`;
  }

  public rule({ declarations, selectors }: Rule) {
    if (!declarations.length) {
      return '';
    }
    return `${selectors.join(',\n')} {\n${this.mapVisit(declarations, '\n')}\n}`;
  }

  public declaration({ property, value }: Declaration) {
    return `\t${property}: ${value};`;
  }
}
