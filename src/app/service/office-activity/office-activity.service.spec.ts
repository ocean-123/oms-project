import { TestBed } from '@angular/core/testing';

import { OfficeActivityService } from './office-activity.service';

describe('OfficeActivityService', () => {
  let service: OfficeActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfficeActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
