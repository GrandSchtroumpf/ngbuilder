import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleDeclarationComponent } from './style-declaration.component';

describe('StyleDeclarationComponent', () => {
  let component: StyleDeclarationComponent;
  let fixture: ComponentFixture<StyleDeclarationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StyleDeclarationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
