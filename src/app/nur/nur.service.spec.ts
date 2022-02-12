import { TestBed } from '@angular/core/testing';

import { NurService } from './nur.service';

describe('NurService', () => {
  let service: NurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
