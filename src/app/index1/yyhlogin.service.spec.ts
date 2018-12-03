import { TestBed, inject } from '@angular/core/testing';

import { YyhloginService } from './yyhlogin.service';

describe('YyhloginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YyhloginService]
    });
  });

  it('should be created', inject([YyhloginService], (service: YyhloginService) => {
    expect(service).toBeTruthy();
  }));
});
