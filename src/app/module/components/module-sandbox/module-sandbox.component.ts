import {
  Component,
  OnInit,
  NgModule,
  ViewChild,
  ViewContainerRef,
  NgZone,
  Compiler,
  Input,
  Type
} from '@angular/core';

@Component({
  selector: 'module-sandbox',
  templateUrl: './module-sandbox.component.html',
  styleUrls: ['./module-sandbox.component.css']
})
export class ModuleSandboxComponent implements OnInit {

  @Input() set module(config: NgModule) {
    this.changeCmp(config);
  }
  @ViewChild('vc', { read: ViewContainerRef })
  container: ViewContainerRef;

  constructor(private compiler: Compiler, private zone: NgZone) {}

  ngOnInit() {}

  /**
   * Change the current component
   * @param sandbox Sandbox with module and component data
   */
  private changeCmp(module: NgModule) {
    this.container.clear();
    const tmpModule = NgModule(module)(class {});
    this.zone.runOutsideAngular(() => this.createDynamicComponent(tmpModule));
  }

  /**
   * Create the component inside the view Container
   * @param moduleType The class decorated with NgModule that hold the cmpt
   */
  private createDynamicComponent(moduleType: Type<any>) {
    this.compiler
      .compileModuleAndAllComponentsAsync<any>(moduleType)
      .then(factories => {
        const cmpFactory = factories.componentFactories[0];
        this.container.createComponent<any>(cmpFactory);
      });
  }
}
