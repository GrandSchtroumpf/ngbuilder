export interface Node {
  type: string;
}

export interface Error {
  message: string;
  reason: string;
  filename: string;
  line: string;
  column: string;
  source: string;
}

export interface Stylesheet extends Node {
  type: 'stylesheet';
  stylesheet: {
    rules: Rule[];
    parsingErrors: Error[];
  };
}

export interface Rule extends Node {
  type: 'rule';
  selectors: string[];
  declarations: (Declaration | Comment)[];
}

export interface Declaration extends Node {
  type: 'declaration';
  property: string;
  value: string;
}

export interface Comment extends Node {
  type: 'comment';
  comment: string;
}

/********
 * @Rules
 *******/

export interface AtCharset extends Node {
  type: 'charset';
  charset: string;
}

export interface AtCustomMedia extends Node {
  type: 'custom-media';
  name: string;
  media: string;
}

export interface AtDocument extends Node {
  type: 'document';
  document: string;
  vendor?: string;
  rules: (Rule | Comment | AtRule)[];
}

export interface AtFontFace extends Node {
  type: 'font-face';
  declarations: (Declaration | Comment)[];
}

export interface AtHost extends Node {
  type: 'host';
  rules: (Rule | Comment)[];
}

export interface AtImport extends Node {
  type: 'import';
  import: string;
}

export interface AtKeyframes extends Node {
  type: 'keyframes';
  vendor?: string;
  keyframes: (Keyframe | Comment)[];
}

export interface Keyframe extends Node {
  type: 'keyframe';
  values: string[];
  declarations: (Declaration | Comment)[];
}

export interface AtMedia extends Node {
  type: 'media';
  media: string;
  rules: (Rule | Comment | AtRule)[];
}

export interface AtNamespace extends Node {
  type: 'namespace';
  namespace: string;
}

export interface AtPage extends Node {
  type: 'page';
  selectors: string[];
  declarations: (Declaration | Comment)[];
}

export interface AtSupports extends Node {
  type: 'supports';
  supports: string;
  rules: (Rule | Comment)[];
}

export type AtRule =
  | AtCharset
  | AtCustomMedia
  | AtDocument
  | AtFontFace
  | AtHost
  | AtImport
  | AtKeyframes
  | AtMedia
  | AtNamespace
  | AtPage
  | AtSupports;
