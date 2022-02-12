import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSiteNurComponent } from './show-site-nur.component';

describe('ShowSiteNurComponent', () => {
  let component: ShowSiteNurComponent;
  let fixture: ComponentFixture<ShowSiteNurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSiteNurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSiteNurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
