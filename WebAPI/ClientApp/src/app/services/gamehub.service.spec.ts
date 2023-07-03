import { TestBed } from '@angular/core/testing';

import { GamehubService } from './gamehub.service';

describe('GamehubService', () => {
  let service: GamehubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamehubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
