import { TestBed } from '@angular/core/testing';

import { BODCatalogService } from './bodcatalog.service';

describe('BODCatalogService', () => {
  let service: BODCatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BODCatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
