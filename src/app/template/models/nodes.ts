export interface Attributes { [type: string]: string; }

export interface TreeElement {
  name: string;
  att: Attributes;
  level?: number;
  parent?: number;
  children?: number[];
  text?: string;
  expanded?: boolean;
}
