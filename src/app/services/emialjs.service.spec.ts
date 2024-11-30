import { TestBed } from '@angular/core/testing';

import { EmialjsService } from './emialjs.service';

describe('EmialjsService', () => {
  let service: EmialjsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmialjsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
