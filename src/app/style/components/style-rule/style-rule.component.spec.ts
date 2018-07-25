import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleRuleComponent } from './style-rule.component';

describe('StyleRuleComponent', () => {
  let component: StyleRuleComponent;
  let fixture: ComponentFixture<StyleRuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StyleRuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
