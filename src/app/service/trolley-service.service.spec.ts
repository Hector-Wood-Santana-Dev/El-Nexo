import { TestBed } from '@angular/core/testing';

import { TrolleyServiceService } from './trolley-service.service';

describe('TrolleyServiceService', () => {
  let service: TrolleyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrolleyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
