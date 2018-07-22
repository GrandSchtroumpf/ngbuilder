import { BrowserModule } from '@angular/platform-browser';
import { Type, NgModule, Component } from '@angular/core';
import { DynamicComponent } from '../host/dynamic';


export type ComponentHost = Component & { context?: any };

export interface Sandboxes {
  [path: string]: Sandbox;
}

export class Sandbox {

  constructor(
    public cmp: Component = {},
    public module: NgModule = {},
  ) {}

  /**
   * Return the module options with the dynamic component inside
   * @param cmp Dynamic component
   */
  public getModule(cmp: Type<DynamicComponent>) {
    return {
      ...this.module,
      declarations: [...(this.module.declarations || []), cmp]
    };
  }
}
