import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeCaseComponent } from './theme-case.component';

describe('ThemeCaseComponent', () => {
  let component: ThemeCaseComponent;
  let fixture: ComponentFixture<ThemeCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
