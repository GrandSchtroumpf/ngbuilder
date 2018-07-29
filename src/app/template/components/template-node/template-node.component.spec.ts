import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateNodeComponent } from './template-node.component';

describe('TemplateNodeComponent', () => {
  let component: TemplateNodeComponent;
  let fixture: ComponentFixture<TemplateNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
