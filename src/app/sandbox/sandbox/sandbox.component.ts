import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.css']
})
export class SandboxComponent implements OnInit {

  @ViewChild('tools') tool: ElementRef;

  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit() {
  }

  public getEl(el: HTMLElement) {
    const { top, left, width, height } = el.getBoundingClientRect();
    this.renderer.setStyle(this.tool.nativeElement, 'top', `${top}px`);
    this.renderer.setStyle(this.tool.nativeElement, 'left', `${left}px`);
    this.renderer.setStyle(this.tool.nativeElement, 'width', `${width}px`);
    this.renderer.setStyle(this.tool.nativeElement, 'height', `${height}px`);
  }
}
