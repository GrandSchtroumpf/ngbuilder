import { Component } from '@angular/core';
import { NgFile, NgIFile } from '../../shared';

export interface ICmptFile extends Component, NgIFile {
  type: 'component';
  extension: 'ts';
}

export class CmptFile extends NgFile implements ICmptFile {
  public type: 'component' = 'component';
  public extension: 'ts' = 'ts';

  public template = '<test><h1>Hello Test</h1></test>';

  constructor(moduleName: string, name: string) {
    super(`app/${moduleName}/`, name);
  }
}
