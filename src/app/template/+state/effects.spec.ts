import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TemplateEffects } from './effects';

describe('TemplateEffects', () => {
  let actions$: Observable<any>;
  let effects: TemplateEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TemplateEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(TemplateEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
