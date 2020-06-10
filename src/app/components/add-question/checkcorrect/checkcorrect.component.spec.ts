import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckcorrectComponent } from './checkcorrect.component';

describe('CheckcorrectComponent', () => {
  let component: CheckcorrectComponent;
  let fixture: ComponentFixture<CheckcorrectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckcorrectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckcorrectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
