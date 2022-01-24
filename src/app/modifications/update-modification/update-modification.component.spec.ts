import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateModificationComponent } from './update-modification.component';

describe('UpdateModificationComponent', () => {
  let component: UpdateModificationComponent;
  let fixture: ComponentFixture<UpdateModificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateModificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
