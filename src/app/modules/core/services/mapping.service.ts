import { Injectable } from '@angular/core';
import { MappingConfig } from '../../../config/config';
import { MovieQuote } from '../interfaces/movie-quote';

@Injectable({
  providedIn: 'root'
})
export class MappingService {

  constructor() { }

  /**
   * Reads mapping file from Config, and maps
   * the given list of quotes to a generic quote
   * structure to provide a consistent object to
   * use across templates
   * @param {any[]} quotes
   * @returns {any[]}
   */
  mapToGenericQuotes(quotes: any[], mapping: MappingConfig, source: string): MovieQuote[] {
   return quotes.map(quote => this.mapQuote(quote, mapping, source));
  }

  /**
   * Responsible for the actual mapping of a quote object
   * to its generic counterpart.
   * @param {{}} quote
   * @param {{}} mapping
   */
  mapQuote(quote: {}, mapping: MappingConfig, source: string): MovieQuote {
    return new MovieQuote(
      quote[mapping.characterName],
      quote[mapping.quote],
      quote[mapping.createdAt],
      quote[mapping.movie],
      quote[mapping.id],
      quote[mapping.updatedAt],
      parseInt(quote[mapping.year]),
      source
    );
  }

}
