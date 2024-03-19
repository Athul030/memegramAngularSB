import { TestBed } from '@angular/core/testing';

import { Videocall2Service } from './videocall2.service';

describe('Videocall2Service', () => {
  let service: Videocall2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Videocall2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
