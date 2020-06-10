import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeParrentComponent } from './theme-parrent.component';

describe('ThemeParrentComponent', () => {
  let component: ThemeParrentComponent;
  let fixture: ComponentFixture<ThemeParrentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeParrentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeParrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
