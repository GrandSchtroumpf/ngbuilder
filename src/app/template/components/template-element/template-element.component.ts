import { Component, OnInit, Input } from '@angular/core';
import { DefaultTreeElement } from 'parse5';

@Component({
  selector: 'template-element',
  templateUrl: './template-element.component.html',
  styleUrls: ['./template-element.component.css']
})
export class TemplateElementComponent implements OnInit {

  @Input() el: DefaultTreeElement;

  constructor() { }

  ngOnInit() {
  }

}
