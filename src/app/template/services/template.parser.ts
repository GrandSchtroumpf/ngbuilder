import { Injectable } from '@angular/core';
import { serialize, parseFragment } from 'parse5';

@Injectable({
  providedIn: 'root'
})
export class TemplateParser {

  public serialize(ast: Node) {
    return serialize(ast);
  }

  public parseFragment(template: string) {
    return parseFragment(template);
  }
}
