import { Component, OnInit, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { ModuleService } from './../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'module-editor',
  templateUrl: './module-editor.component.html',
  styleUrls: ['./module-editor.component.css']
})
export class ModuleEditorComponent implements OnInit {

  public module$: Observable<NgModule>;

  constructor(
    private service: ModuleService
  ) { }

  ngOnInit() {
    this.module$ = this.service.module$;
  }

}
