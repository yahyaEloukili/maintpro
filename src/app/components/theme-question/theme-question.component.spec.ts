import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeQuestionComponent } from './theme-question.component';

describe('ThemeQuestionComponent', () => {
  let component: ThemeQuestionComponent;
  let fixture: ComponentFixture<ThemeQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
