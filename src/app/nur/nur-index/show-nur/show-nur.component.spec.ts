import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowNurComponent } from './show-nur.component';

describe('ShowNurComponent', () => {
  let component: ShowNurComponent;
  let fixture: ComponentFixture<ShowNurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowNurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowNurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
