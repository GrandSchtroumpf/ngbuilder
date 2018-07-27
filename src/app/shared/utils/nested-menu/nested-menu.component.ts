import { Component, Output, Input, ViewChild, EventEmitter } from '@angular/core';
import { NestedMenu } from './nested-menu';

@Component({
  selector: 'nested-menu',
  templateUrl: './nested-menu.component.html',
  styleUrls: ['./nested-menu.component.css']
})
export class NestedMenuComponent {
  @Input() public items: NestedMenu[];
  @Output() public select = new EventEmitter<NestedMenu>();
  @ViewChild('childMenu') public childMenu;

  public selectItem(item) {
    this.select.emit(item);
  }
}
