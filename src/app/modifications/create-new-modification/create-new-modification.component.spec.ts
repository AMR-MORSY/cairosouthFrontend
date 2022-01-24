import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewModificationComponent } from './create-new-modification.component';

describe('CreateNewModificationComponent', () => {
  let component: CreateNewModificationComponent;
  let fixture: ComponentFixture<CreateNewModificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewModificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
