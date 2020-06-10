import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMetierComponent } from './add-metier.component';

describe('AddMetierComponent', () => {
  let component: AddMetierComponent;
  let fixture: ComponentFixture<AddMetierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMetierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMetierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
