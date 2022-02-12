import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllNurComponent } from './show-all-nur.component';

describe('ShowAllNurComponent', () => {
  let component: ShowAllNurComponent;
  let fixture: ComponentFixture<ShowAllNurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAllNurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllNurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
