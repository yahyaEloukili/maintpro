import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasesActionComponent } from './cases-action.component';

describe('CasesActionComponent', () => {
  let component: CasesActionComponent;
  let fixture: ComponentFixture<CasesActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasesActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasesActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
