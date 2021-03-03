import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditnoteviewComponent } from './editnoteview.component';

describe('EditnoteviewComponent', () => {
  let component: EditnoteviewComponent;
  let fixture: ComponentFixture<EditnoteviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditnoteviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditnoteviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
