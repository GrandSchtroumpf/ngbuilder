import { toKebabCase, toPascalCase } from '../helpers';

export interface NgIFile {
  path: string;
  name: string;
  type: 'module' | 'component';
  extension: 'ts' | 'html' | 'css';
  dir: string;
  className: string;
}

export class NgFile implements NgIFile {
  public type: 'module' | 'component';
  public extension: 'ts' | 'html' | 'css';
  constructor(public dir, public name) {}

  public get path() {
    return this.dir
    + toKebabCase(this.name)
    + '.' + this.type
    + '.'  + this.extension;
  }

  public get className() {
    return toPascalCase(this.name + this.type);
  }
}
