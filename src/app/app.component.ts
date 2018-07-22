import { SandboxService } from './sandbox/services/sandbox.service';
import { BuilderComponent } from './builder/builder.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  public activeApps = [];

  constructor(private sandbox: SandboxService) {}

  ngOnInit() {
    this.sandbox.addSandbox('builder', {template: '<h1>Hello</h1>'});
  }


}
