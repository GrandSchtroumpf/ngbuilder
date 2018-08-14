import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// NGRX
import { Store, select } from '@ngrx/store';
import { AddCmpt, SelectCmpt, selectAllCmpts } from '../../+state';
import { UpdateModule, selectCurrentModule } from '../../../module/+state';
import { State } from '../../../core';
import { Observable } from 'rxjs';

import { ICmptFile, CmptFile } from './../../models';
import { IModuleFile } from '../../../module/models';

@Component({
  selector: 'cmpt-list',
  templateUrl: './cmpt-list.component.html',
  styleUrls: ['./cmpt-list.component.css']
})
export class CmptListComponent implements OnInit {

  public module$: Observable<IModuleFile>;
  public cmpts$: Observable<ICmptFile[]>;
  public isForm: boolean;

  constructor(
    private store: Store<State>,
    private router: Router
  ) { }

  ngOnInit() {
    this.module$ = this.store.pipe(select(selectCurrentModule));
    this.cmpts$ = this.store.pipe(select(selectAllCmpts));
  }

  public create(module: IModuleFile, name: string) {
    this.isForm = false;
    if (!name) { return; }
    const cmpt = new CmptFile(module.name, name);
    const changes = { path: module.path, cmptIds : [...module.cmptIds, cmpt.path] };
    this.store.dispatch(new UpdateModule({ id: module.path, changes }));
    this.store.dispatch(new AddCmpt({cmpt}));
  }

  public open(cmpt: CmptFile) {
    this.store.dispatch(new SelectCmpt({path: cmpt.path}));
    this.router.navigate(['', {
      outlets: {tree: 'template'}
    }], {
      queryParams: { cmpt: cmpt.name },
      queryParamsHandling: 'merge'
    });
  }


}
