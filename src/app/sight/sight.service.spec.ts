import { TestBed, inject } from '@angular/core/testing';


import { SightService } from './sight.service';

describe('SlightService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SightService]
    });
  });

  it('should be created', inject([SightService], (service: SightService) => {
    expect(service).toBeTruthy();
  }));
});
