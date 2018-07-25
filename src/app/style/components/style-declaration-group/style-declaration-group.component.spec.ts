import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleDeclarationGroupComponent } from './style-declaration-group.component';

describe('StyleDeclarationGroupComponent', () => {
  let component: StyleDeclarationGroupComponent;
  let fixture: ComponentFixture<StyleDeclarationGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StyleDeclarationGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleDeclarationGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
