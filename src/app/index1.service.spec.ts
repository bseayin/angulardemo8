import { TestBed, inject } from '@angular/core/testing';

import { Index1Service } from './index1.service';

describe('Index1Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Index1Service]
    });
  });

  it('should be created', inject([Index1Service], (service: Index1Service) => {
    expect(service).toBeTruthy();
  }));
});
