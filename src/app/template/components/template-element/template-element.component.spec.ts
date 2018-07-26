import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateElementComponent } from './template-element.component';

describe('TemplateElementComponent', () => {
  let component: TemplateElementComponent;
  let fixture: ComponentFixture<TemplateElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
