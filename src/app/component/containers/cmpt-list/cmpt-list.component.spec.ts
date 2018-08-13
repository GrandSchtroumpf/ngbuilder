import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmptListComponent } from './cmpt-list.component';

describe('CmptListComponent', () => {
  let component: CmptListComponent;
  let fixture: ComponentFixture<CmptListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmptListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmptListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
