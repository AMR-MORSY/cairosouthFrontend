import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurIndexComponent } from './nur-index.component';

describe('NurIndexComponent', () => {
  let component: NurIndexComponent;
  let fixture: ComponentFixture<NurIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NurIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
