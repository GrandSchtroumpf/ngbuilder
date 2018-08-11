import { Component, OnInit, ChangeDetectionStrategy, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'node-picker',
  templateUrl: './node-picker.component.html',
  styleUrls: ['./node-picker.component.css']
})
export class NodePickerComponent implements OnInit {

  private elRect: { top: number, left: number };

  @ViewChild('elRef')
  private refHover: ElementRef;
  @ViewChild('select')
  private refSelected: ElementRef;
  @ViewChild('editTool')
  private refEdit: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {

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
    this.renderer.setStyle(ref, 'top', `${rect.top - refRect.height - this.elRect.top}px`);
    this.renderer.setStyle(ref, position, `${rect[position] - this.elRect[position]}px`);
    this.renderer.setStyle(ref, 'display', 'block');
    this.renderer.setStyle(ref, 'opacity', '1');
  }

  public init() {
    this.elRect = this.refHover.nativeElement.getBoundingClientRect();
  }

  public enter(el: HTMLElement) {
    this.setBorder(this.refHover.nativeElement, el);
  }

  public leave(el: HTMLElement) {
    this.renderer.setStyle(this.refHover.nativeElement, 'display', 'none');
  }

  public click(el: HTMLElement) {
    this.setBorder(this.refSelected.nativeElement, el);
    this.setTools(this.refEdit.nativeElement, el, 'left');
  }

}
