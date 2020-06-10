import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyCasesComponent } from './study-cases.component';

describe('StudyCasesComponent', () => {
  let component: StudyCasesComponent;
  let fixture: ComponentFixture<StudyCasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyCasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
