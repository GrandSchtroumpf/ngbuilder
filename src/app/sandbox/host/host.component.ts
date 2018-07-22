import {
  Component,
  Input,
  NgZone,
  NgModule,
  NgModuleRef,
  HostListener,
  Output,
  EventEmitter,
  Type,
  ViewChild,
  ViewContainerRef,
  Compiler,
  ComponentRef
} from '@angular/core';
import { Sandbox } from '../models/sandbox';
import { DynamicComponent } from './dynamic';
import { SandboxService } from './../services/sandbox.service';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css']
})
export class HostComponent {
  private dynamicCmp: ComponentRef<DynamicComponent>;
  public activeApp: NgModuleRef<any>;

  @Input()
  set path(_path: string) {
    const sandbox = this.sandboxService.sandboxes[_path];
    if (!sandbox) {
      throw new Error(`No sandbox for path ${_path}`);
    }
    this.changeCmp(sandbox);
  }

  @Output() clickEl = new EventEmitter<HTMLElement>();
  @Output() hoverEl = new EventEmitter<HTMLElement>();

  @ViewChild('vc', { read: ViewContainerRef }) container: ViewContainerRef;

  constructor(
    private compiler: Compiler,
    private sandboxService: SandboxService,
    private zone: NgZone
  ) {}

  @HostListener('mouseover', ['$event.target'])
  hover(el) {
    this.hoverEl.emit(el);
  }

  /**
   * Change the current component
   * @param sandbox Sandbox with module and component data
   */
  private changeCmp(sandbox: Sandbox) {
    this.container.clear();
    const tmpCmp = Component(sandbox.cmp)(DynamicComponent);
    const tmpModule = NgModule(sandbox.getModule(tmpCmp))(class {});
    this.zone.runOutsideAngular(() => this.createDynamicComponent(tmpModule));
  }

  private createDynamicComponent(moduleType: Type<any>) {
    this.compiler
      .compileModuleAndAllComponentsAsync<any>(moduleType)
      .then(factories => {
        const cmpFactory = factories.componentFactories[0];
        this.dynamicCmp = this.container.createComponent<DynamicComponent>(
          cmpFactory
        );
      });
  }
}
