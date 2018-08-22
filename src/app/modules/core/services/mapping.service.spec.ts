import { TestBed, inject } from '@angular/core/testing';

import { MappingService } from './mapping.service';
import { MovieQuote } from '../interfaces/movie-quote';

describe('MappingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MappingService]
    });
  });

  it('should be created', inject([MappingService], (service: MappingService) => {
    expect(service).toBeTruthy();
  }));

  it('should map a returned quote to a generic MovieQuote', inject([MappingService], (service: MappingService) => {
    const receivedQuote = {
      'onScreenCharacter': 'Jennifer Cavalleri',
      'quote': 'Love means never having to say you\'re sorry..',
      'addedOn': '2018-07-25T14:41:09.694Z',
      'movieTitle': 'Love Story',
      'id': 1,
      'updatedOn': '2018-07-25T14:46:09.694Z',
      'year': '1970'
    };

    const mapping = {
      characterName: 'onScreenCharacter',
      quote: 'quote',
      createdAt: 'addedOn',
      movie: 'movieTitle',
      id: 'id',
      updatedAt: 'updatedOn',
      year: 'year'
    };

    const expected = new MovieQuote(
      'Jennifer Cavalleri',
      'Love means never having to say you\'re sorry..',
      '2018-07-25T14:41:09.694Z',
      'Love Story',
      1,
      '2018-07-25T14:46:09.694Z',
      1970,
      'Test');


    expect(service.mapQuote(receivedQuote, mapping, 'Test')).toEqual(expected);

  }));
});
