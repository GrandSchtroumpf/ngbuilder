import {
  Component,
  OnInit,
  ViewContainerRef,
  Input,
  ComponentFactory,
  HostListener,
  Output,
  EventEmitter,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'module-view',
  templateUrl: './module-view.component.html',
  styleUrls: ['./module-view.component.css']
})
export class ModuleViewComponent implements OnInit {

  @Input()
  public set cmpt(factory: ComponentFactory<any>) {
    this.container.clear();
    this.container.createComponent(factory);
  }

  @Output()
  public onenter = new EventEmitter<HTMLElement>();
  @Output()
  public onleave = new EventEmitter<HTMLElement>();
  @Output()
  public onclick = new EventEmitter<HTMLElement>();

  @ViewChild('vc', { read: ViewContainerRef })
  private container: ViewContainerRef;

  constructor() {}

  @HostListener('mouseover', ['$event.target'])
  private enter(target: HTMLElement) {
    this.onenter.emit(target);
  }

  @HostListener('mouseout', ['$event.relatedTarget'])
  private leave(nextTarget: HTMLElement) {
    this.onleave.emit(nextTarget);
  }

  @HostListener('click', ['$event'])
  private click(event: MouseEvent) {
    this.onclick.emit(event.target as HTMLElement);
  }

  ngOnInit() {}
}
