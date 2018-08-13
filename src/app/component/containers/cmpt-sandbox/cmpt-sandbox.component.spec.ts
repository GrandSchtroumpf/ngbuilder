import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmptSandboxComponent } from './cmpt-sandbox.component';

describe('CmptSandboxComponent', () => {
  let component: CmptSandboxComponent;
  let fixture: ComponentFixture<CmptSandboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmptSandboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmptSandboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
