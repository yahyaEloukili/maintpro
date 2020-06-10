import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMetierComponent } from './edit-metier.component';

describe('EditMetierComponent', () => {
  let component: EditMetierComponent;
  let fixture: ComponentFixture<EditMetierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMetierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMetierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
