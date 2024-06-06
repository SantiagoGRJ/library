import { TestBed } from '@angular/core/testing';

import { BooksServicesService } from './books-services.service';

describe('BooksServicesService', () => {
  let service: BooksServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BooksServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
