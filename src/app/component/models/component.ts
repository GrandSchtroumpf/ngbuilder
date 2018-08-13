import { Component } from '@angular/core';
import { NgFile, NgIFile } from '../../shared';

export interface ICmptFile extends Component, NgIFile {
  type: 'component';
  extension: 'ts';
}

export class CmptFile extends NgFile implements ICmptFile {
  public type: 'component' = 'component';
  public extension: 'ts' = 'ts';

  constructor(moduleName: string, name: string) {
    super('app/', name);
  }
}
