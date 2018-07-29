import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnChanges } from '@angular/core';
import { DefaultTreeElement } from 'parse5';
import { BehaviorSubject } from 'rxjs';

@Component({
  // changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'template-node',
  templateUrl: './template-node.component.html',
  styleUrls: ['./template-node.component.css']
})
export class TemplateNodeComponent implements OnInit {

  @Input() set tree(node: DefaultTreeElement) {
    console.log('input', node.nodeName);
    this.children.next([]); // WTF !!
    this.node = node;
    this.children.next([...node.childNodes] as DefaultTreeElement[]);
  }
  @Output() selected = new EventEmitter<DefaultTreeElement>();
  public isExpanded: boolean;
  public node: DefaultTreeElement;
  public children = new BehaviorSubject<DefaultTreeElement[]>([]);

  constructor() { }

  public get isExpandable() {
    return !!this.node.childNodes && this.node.childNodes.length > 0;
  }

  ngOnInit() {
  }

  public toggle() { this.isExpanded = !this.isExpanded; }

  public select(node: DefaultTreeElement) {
    this.selected.emit(node);
  }
}
