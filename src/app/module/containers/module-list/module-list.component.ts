import { Router } from '@angular/router';
import { AddModule, SelectModule, selectAllModules } from './../../+state';
import { Component, OnInit } from '@angular/core';
import { IModuleFile, ModuleFile } from '../../models';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State } from '../../../core';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.css']
})
export class ModuleListComponent implements OnInit {

  public modules$: Observable<IModuleFile[]>;
  public isForm: boolean;

  constructor(
    private store: Store<State>,
    private router: Router
  ) { }

  ngOnInit() {
    this.modules$ = this.store.pipe(select(selectAllModules));
  }

  public create(name: string) {
    this.isForm = false;
    if (!name) { return; }
    const module = new ModuleFile(name);
    this.store.dispatch(new AddModule({module}));
  }

  public open(name: string) {
    this.router.navigate(['', {
      outlets: {tree: 'cmpt-list'}
    }], {
      queryParams: { module: name }
    });
  }


}
