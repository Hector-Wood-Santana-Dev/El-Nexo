import { TestBed } from '@angular/core/testing';

import { ReadTextService } from './read-text.service';

describe('ReadTextService', () => {
  let service: ReadTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
