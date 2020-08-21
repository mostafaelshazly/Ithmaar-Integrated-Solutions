import { TestBed } from '@angular/core/testing';

import { ServicesAPIService } from './services-api.service';

describe('ServicesAPIService', () => {
  let service: ServicesAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
