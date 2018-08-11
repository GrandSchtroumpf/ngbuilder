import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleBackgroundComponent } from './style-background.component';

describe('StyleBackgroundComponent', () => {
  let component: StyleBackgroundComponent;
  let fixture: ComponentFixture<StyleBackgroundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StyleBackgroundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
