import { TestBed, async, inject } from '@angular/core/testing';

import { ComponentListGuard } from './component-list.guard';

describe('ComponentListGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComponentListGuard]
    });
  });

  it('should ...', inject([ComponentListGuard], (guard: ComponentListGuard) => {
    expect(guard).toBeTruthy();
  }));
});
