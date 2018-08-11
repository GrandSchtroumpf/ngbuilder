import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { StyleGroup, StyleType, Rule } from './../../models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'style-group',
  templateUrl: './style-group.component.html',
  styleUrls: ['./style-group.component.css']
})
export class StyleGroupComponent implements OnInit {

  @Input() group: StyleGroup;
  @Input() rule: Rule;
  public types = StyleType;

  constructor() { }

  ngOnInit() {

  }

}
