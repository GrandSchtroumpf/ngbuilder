import { Sandboxes } from './../models/sandbox';
import { Sandbox, ComponentHost } from '../models/sandbox';
import { Injectable, NgZone, NgModule, Component } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SandboxService {

  public sandboxes: Sandboxes = {};

  constructor(
    private zone: NgZone
  ) { }

  public addSandbox(path: string, cmp?: Component, module?: NgModule) {
    this.sandboxes = {...this.sandboxes, [path]: new Sandbox(cmp, module) };
  }
}
