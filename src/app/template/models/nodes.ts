export interface Attributes { [type: string]: string; }

// TODO : create a TreeElement and ShowTreeElement
export interface TreeElement {
  index: number;
  name: string;
  att: Attributes;
  level?: number;
  parent?: number;
  children?: number[];
  text?: string;
  expanded?: boolean;
  visible?: boolean;
}
