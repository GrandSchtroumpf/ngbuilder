import { Component, OnInit, NgModule } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.css']
})
export class ModuleListComponent implements OnInit {

  public paths$: Observable<string[]>;

  constructor() { }

  ngOnInit() {

  }

}
