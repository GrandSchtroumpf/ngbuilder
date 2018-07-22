import { HostComponent } from './host/host.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SandboxComponent } from './sandbox/sandbox.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HostComponent, SandboxComponent],
  exports: [SandboxComponent],
})
export class SandboxModule { }
