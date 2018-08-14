import { TestBed, async, inject } from '@angular/core/testing';

import { TemplateTreeGuard } from './template-tree.guard';

describe('TemplateTreeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TemplateTreeGuard]
    });
  });

  it('should ...', inject([TemplateTreeGuard], (guard: TemplateTreeGuard) => {
    expect(guard).toBeTruthy();
  }));
});
