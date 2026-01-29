import { TestBed } from '@angular/core/testing';

import { StoreActivityService } from './store-activity.service';

describe('StoreActivityService', () => {
  let service: StoreActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
