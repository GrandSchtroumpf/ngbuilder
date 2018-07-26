import { Injectable } from '@angular/core';
import {
  Stylesheet,
  Comment,
  Declaration,
  Rule,
  AtCustomMedia,
  AtCharset,
  AtRule,
  AtDocument,
  AtFontFace,
  AtHost,
  AtImport,
  AtKeyframes,
  Keyframe,
  AtMedia,
  AtNamespace,
  AtPage,
  AtSupports
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class StyleBuilder {

  /**
   * Create the root of the AST
   */
  public createStylesheet(): Stylesheet {
    return {
      type: 'stylesheet',
      stylesheet: {
        rules: [],
        parsingErrors: []
      }
    };
  }

  /**
   * A rule is a selector with declarations inside
   * @param selectors id | class | tag
   * @param declarations A declaration of style
   */
  public createRule(
    selectors: string[],
    declarations: (Declaration | Comment)[]
  ): Rule {
    return { type: 'rule', selectors, declarations };
  }

  /**
   * A declaration with the key and value
   * @param property color | width | ...
   * @param value The full value
   */
  public createDeclaration(property: string, value: string): Declaration {
    return { type: 'declaration', property, value };
  }

  public createComment(comment: string): Comment {
    return { type: 'comment', comment };
  }

  public createAtCharset(charset: string): AtCharset {
    return { type: 'charset', charset };
  }

  public createAtCustomMedia(name: string, media: string): AtCustomMedia {
    return { type: 'custom-media', name, media };
  }

  public createAtDocument(
    document: string,
    rules: (Rule | Comment | AtRule)[],
    vendor?: string
  ): AtDocument {
    return { type: 'document', document, vendor, rules };
  }

  public createAtFontFace(declarations: (Declaration | Comment)[]): AtFontFace {
    return { type: 'font-face', declarations };
  }

  public createAtHost(rules: (Rule | Comment)[]): AtHost {
    return { type: 'host', rules };
  }

  public createAtImport(value: string): AtImport {
    return { type: 'import', import: value };
  }

  public createAtKeyframes(
    keyframes: (Keyframe | Comment)[],
    vendor?: string
  ): AtKeyframes {
    return { type: 'keyframes', keyframes, vendor };
  }

  public createKeyframe(
    values: string[],
    declarations: (Declaration | Comment)[]
  ): Keyframe {
    return { type: 'keyframe', values, declarations };
  }

  public createAtMedia(
    media: string,
    rules: (Rule | Comment | AtRule)[]
  ): AtMedia {
    return { type: 'media', media, rules };
  }

  public createAtNamespace(namespace: string): AtNamespace {
    return { type: 'namespace', namespace };
  }

  public createAtPage(
    selectors: string[],
    declarations: (Declaration | Comment)[]
  ): AtPage {
    return { type: 'page', selectors, declarations };
  }

  public createAtSupports(
    supports: string,
    rules: (Rule | Comment)[]
  ): AtSupports {
    return { type: 'supports', supports, rules };
  }
}
