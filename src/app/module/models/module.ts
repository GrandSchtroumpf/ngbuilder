import { NgModule } from '@angular/core';
import { NgIFile, NgFile } from '../../shared';

export interface IModuleFile extends NgIFile, NgModule {
  cmptIds: string[];
}

export class ModuleFile extends NgFile implements IModuleFile {
  public type: 'module' = 'module';
  public extension: 'ts' = 'ts';
  public cmptIds = [];

  constructor(name: string) {
    super('app/', name);
  }
}
