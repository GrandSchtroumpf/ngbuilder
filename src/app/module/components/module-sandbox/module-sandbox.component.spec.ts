import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleSandboxComponent } from './module-sandbox.component';

describe('ModuleSandboxComponent', () => {
  let component: ModuleSandboxComponent;
  let fixture: ComponentFixture<ModuleSandboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleSandboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleSandboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
