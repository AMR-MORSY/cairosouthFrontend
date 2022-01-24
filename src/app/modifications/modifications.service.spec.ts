import { TestBed } from '@angular/core/testing';

import { ModificationsService } from './modifications.service';

describe('ModificationsService', () => {
  let service: ModificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
