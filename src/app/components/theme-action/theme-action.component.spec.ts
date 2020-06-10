import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeActionComponent } from './theme-action.component';

describe('ThemeActionComponent', () => {
  let component: ThemeActionComponent;
  let fixture: ComponentFixture<ThemeActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
