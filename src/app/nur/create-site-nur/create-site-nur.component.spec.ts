import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSiteNurComponent } from './create-site-nur.component';

describe('CreateSiteNurComponent', () => {
  let component: CreateSiteNurComponent;
  let fixture: ComponentFixture<CreateSiteNurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSiteNurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSiteNurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
