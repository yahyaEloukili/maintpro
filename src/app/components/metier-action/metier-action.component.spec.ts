import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetierActionComponent } from './metier-action.component';

describe('MetierActionComponent', () => {
  let component: MetierActionComponent;
  let fixture: ComponentFixture<MetierActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetierActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetierActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
