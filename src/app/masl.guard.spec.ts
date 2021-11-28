import { TestBed } from '@angular/core/testing';

import { MaslGuard } from './masl.guard';

describe('MaslGuard', () => {
  let guard: MaslGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MaslGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
