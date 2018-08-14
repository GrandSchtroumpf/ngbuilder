import { ModuleService } from './../../services/module.service';
import {
  Component,
  OnInit,
  NgModule,
  ViewChild,
  NgZone,
  Compiler,
  Input,
  Type,
  ChangeDetectionStrategy
} from '@angular/core';
import { NodePickerComponent } from '../../../template/components';
import { ModuleViewComponent } from '../../components/module-view/module-view.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'module-sandbox',
  templateUrl: './module-sandbox.component.html',
  styleUrls: ['./module-sandbox.component.css']
})
export class ModuleSandboxComponent implements OnInit {

  @Input()
  private set module(config: NgModule) {
    this.changeCmp(config);
  }

  @ViewChild(ModuleViewComponent)
  private moduleView: ModuleViewComponent;
  @ViewChild(NodePickerComponent)
  private nodePicker: NodePickerComponent;

  constructor(
    private service: ModuleService,
    private compiler: Compiler,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.moduleView.onenter.subscribe(el => this.nodePicker.enter(el));
    this.moduleView.onleave.subscribe(el => this.nodePicker.leave(el));
    this.moduleView.onclick.subscribe((el: HTMLElement) => {
      this.service.selectElement(parseInt(el.getAttribute('ngid'), 10));
      // this.nodePicker.click(el);
    });
  }

  /**
   * Change the current component
   * @param sandbox Sandbox with module and component data
   */
  private changeCmp(module: NgModule) {
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
        this.moduleView.cmpt = cmpFactory;
        this.nodePicker.init();
      });
  }

}
