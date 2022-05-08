import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationIndexComponent } from './modification-index.component';

describe('ModificationIndexComponent', () => {
  let component: ModificationIndexComponent;
  let fixture: ComponentFixture<ModificationIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificationIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificationIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
