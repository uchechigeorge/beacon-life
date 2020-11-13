import { TestBed } from '@angular/core/testing';

import { InsertPinService } from './insert-pin.service';

describe('InsertPinService', () => {
  let service: InsertPinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsertPinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
