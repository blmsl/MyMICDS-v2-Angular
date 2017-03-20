import { TestBed, inject } from '@angular/core/testing';

import { ModulesService } from './modules.service';

describe('ModulesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModulesService]
    });
  });

  it('should ...', inject([ModulesService], (service: ModulesService) => {
    expect(service).toBeTruthy();
  }));
});
