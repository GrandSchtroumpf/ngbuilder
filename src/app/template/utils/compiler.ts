import { Injectable } from '@angular/core';
import { TreeElement } from './../models/nodes';

@Injectable({ providedIn: 'root' })
export class TemplateCompiler {

  public compile(tree: TreeElement[]) {
    // Don't return the 'root' element
    return this.getChildren(tree, 0);
  }

  /**
   * Create an element string based on the tree
   * @param tree The tree of elements
   * @param index The index of the current element in the tree
   */
  public createElement(tree: TreeElement[], index: number) {
    const el = tree[index];
    // Create attribute string
    let attributes = '';
    for (const key in el.att) {
      attributes += ` ${key}="${el.att[key]}"`;
    }
    const children = this.getChildren(tree, index);
    const indent = this.getIndent(el);
    const text = el.text ? el.text : '';
    return `${indent}<${el.name}${attributes} ngid="${index}">${text}\n${children}\n${indent}</${el.name}>`;
  }

  /** Create all children of an element */
  public getChildren(tree: TreeElement[], index: number) {
    return tree[index].children
    .map(child => this.createElement(tree, child))
    .join('\n');
  }

  /** Get the amount of indent for this element */
  public getIndent(el: TreeElement) {
    return Array(el.level).fill('\t').join('');
  }
}
