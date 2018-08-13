import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectModuleName } from './../../+state/selectors';
import { SelectModule } from './../../../module/+state';

import { State } from '../../reducers';
import { ModuleFile } from '../../../module/models';
import { map } from 'rxjs/operators';

@Component({
  selector: 'core-layout',
  templateUrl: './core-layout.component.html',
  styleUrls: ['./core-layout.component.css']
})
export class CoreLayoutComponent implements OnInit {

  constructor(private store: Store<State>) {}

  ngOnInit() {
  }

}
