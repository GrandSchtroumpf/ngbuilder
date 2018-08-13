import { Component, OnInit, ChangeDetectionStrategy, ElementRef, Renderer2, ViewChild, OnDestroy } from '@angular/core';
import { TemplateService } from '../../services';
import { takeWhile, map } from 'rxjs/operators';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'node-picker',
  templateUrl: './node-picker.component.html',
  styleUrls: ['./node-picker.component.css']
})
export class NodePickerComponent implements OnInit, OnDestroy {

  private isAlive = true;
  private elRect: { top: number, left: number };

  @ViewChild('elRef')
  private refHover: ElementRef;
  @ViewChild('select')
  private refSelected: ElementRef;
  @ViewChild('editTool')
  private refEdit: ElementRef;

  constructor(
    private service: TemplateService,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    /*
    this.service.selected$.pipe(
      takeWhile(() => this.isAlive),
      map(index => this.service.tree[index])
    ).subscribe(el => this.click(el));
    */
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  private setBorder(ref: HTMLElement, target: HTMLElement) {
    const { width, height, top, left } = target.getBoundingClientRect();
    this.renderer.setStyle(ref, 'width', `${width}px`);
    this.renderer.setStyle(ref, 'height', `${height}px`);
    this.renderer.setStyle(ref, 'top', `${top - this.elRect.top}px`);
    this.renderer.setStyle(ref, 'left', `${left - this.elRect.left}px`);
    this.renderer.setStyle(ref, 'display', 'block');
    this.renderer.setStyle(ref, 'opacity', '1');
  }

  private setTools(ref: HTMLElement, target: HTMLElement, position: 'right' | 'left') {
    const rect = target.getBoundingClientRect();
    const refRect = ref.getBoundingClientRect();
    const top = rect.top - refRect.height - this.elRect.top;
    const left = rect[position] - this.elRect[position] - (position === 'right' ? refRect.width : 0);
    this.renderer.setStyle(ref, 'top', `${top}px`);
    this.renderer.setStyle(ref, 'left', `${left}px`);
    this.renderer.setStyle(ref, 'display', 'block');
    this.renderer.setStyle(ref, 'pointer-events', 'auto');
    this.renderer.setStyle(ref, 'opacity', '1');
  }

  /** Init the size of the container */
  public init() {
    this.elRect = this.refHover.nativeElement.getBoundingClientRect();
  }

  /** Enter on hover */
  public enter(el: HTMLElement) {
    this.setBorder(this.refHover.nativeElement, el);
  }

  /** Leave on hover */
  public leave(el: HTMLElement) {
    this.renderer.setStyle(this.refHover.nativeElement, 'display', 'none');
  }

  /** Click an element */
  public click(el: HTMLElement) {
    this.setBorder(this.refSelected.nativeElement, el);
    this.setTools(this.refEdit.nativeElement, el, 'right');
  }

}
