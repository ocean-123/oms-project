import { TestBed } from '@angular/core/testing';

import { StoreInventoryService } from './store-inventory.service';

describe('StoreInventoryService', () => {
  let service: StoreInventoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreInventoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
