import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Config, EndpointConfig } from '../../../config/config';
import { MovieQuote } from '../interfaces/movie-quote';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { MappingService } from './mapping.service';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  quotes$: BehaviorSubject<MovieQuote[]> = new BehaviorSubject<MovieQuote[]>([]);
  randomQuote$: BehaviorSubject<MovieQuote> = new BehaviorSubject<MovieQuote>(<MovieQuote>{});
  isFiltered$: Subject<boolean> = new Subject<boolean>();

  constructor(private httpService: HttpService, private mappingService: MappingService) { }

  /**
   * Loads all quotes, from various sources
   * @returns {BehaviorSubject<MovieQuote[]>}
   */
  getQuotes() {
    const endpoints: EndpointConfig[] = Config.getQuoteEndpoints();
    let quotes: MovieQuote[] = [];
    endpoints.forEach((endpoint: EndpointConfig) => {
      this.httpService.doGet(endpoint.url).subscribe((response: any[]) => {
        quotes = this.combineQuotes(quotes, this.mappingService.mapToGenericQuotes(response, endpoint.mapping, endpoint.source));
      });
    });
    this.quotes$.next(quotes);
    this.isFiltered$.next(false);
  }

  /**
   * Load a random quote from the random quote API
   */
  getRandomQuote() {
    this.httpService.doGet(Config.getRandomQuote()).subscribe((response: any) => {
      let quote: MovieQuote = this.mappingService.mapQuote(response, Config.getGoReportMapping(), 'GoReport');

      const imageSearchResults: GoogleSearchResultPartial = JSON.parse(this.getImageFromLocalStorage(quote, 'full_'));

      if (!imageSearchResults) {
        this.loadImage(quote).subscribe((searchResponse: GoogleSearchResultPartial) => {
          this.storeImageInLocalStorage(quote.movie, JSON.stringify(searchResponse), 'full_');
          quote = this.addImages(searchResponse, quote);
          this.randomQuote$.next(quote);
        });
      } else {
        quote = this.addImages(imageSearchResults, quote);
        this.randomQuote$.next(quote);
      }

      this.loadRating(quote).subscribe((ratingResponse: MovieDatabaseSearchResultPartial) => {
        quote.rating = ratingResponse.results[0].vote_average;
        quote.movieDbId = ratingResponse.results[0].id;
        this.randomQuote$.next(quote);
      });
    });
  }

  /**
   * Adds multiple images from Google custom search
   * to quote object
   * @param {GoogleSearchResultPartial} searchResponse
   * @param {MovieQuote} quote
   * @returns {MovieQuote}
   */
  addImages(searchResponse: GoogleSearchResultPartial, quote: MovieQuote) {
    quote.images = [];
    searchResponse.items.forEach(item => {
      quote.images.push(item.link);
    });
    return quote;
  }

  /**
   * Filter the list of quotes by their source (useful if
   * retrieving from multiple APIs)
   * @param {string} source
   */
  filterBySource(source: string) {
    const quotes: MovieQuote[] = this.quotes$.getValue();
    const filtered = quotes.filter((quote: MovieQuote) => {
      return quote.source === source;
    });
    this.quotes$.next(filtered);
    this.isFiltered$.next(true);
  }

  /**
   * Reset the quotes back to their original state
   */
  resetFilters() {
    this.getQuotes();
  }

  /**
   * Combine newly fetched quotes with the existing
   * array.
   * @param {MovieQuote[]} quotes
   * @param {MovieQuote[]} newQuotes
   * @returns {MovieQuote[]}
   */
  combineQuotes(quotes: MovieQuote[], newQuotes: MovieQuote[]) {
    newQuotes.forEach((quote: MovieQuote) => {
      const image: string = this.getImageFromLocalStorage(quote);
      const movieData: MovieDatabaseSearchResultPartial = this.loadMovieDbInfoFromLS(quote.movie);

      // Add image to quote
      if (!image) {
        this.loadImage(quote).subscribe((response: GoogleSearchResultPartial) => {
          console.warn(`No image data for ${quote.movie} in store. Going live.. 😬`);
          quote.image = response.items[0].link;
          this.storeImageInLocalStorage(quote.movie, response.items[0].link);
        });
      } else {
        quote.image = image;
      }

      // Add rating to quote
      if (!movieData) {
        this.loadRating(quote).subscribe((response: MovieDatabaseSearchResultPartial) => {
          console.warn(`No movieDb data for ${quote.movie} in store. Going live.. 😬`);
          quote.rating = response.results[0].vote_average;
          quote.movieDbId = response.results[0].id;
          this.storeMovieDbInfoInLS(quote.movie, response);
        });
      } else {
        quote.rating = movieData.results[0].vote_average;
        quote.movieDbId = movieData.results[0].id;
      }
      quotes.push(quote);

    });
    return quotes;
  }

  /**
   * Load an image for this movie using Google custom search API
   * @param {MovieQuote} quote
   * @returns {Observable<Object>}
   */
  loadImage(quote: MovieQuote) {
    return this.httpService.doGet(Config.customSearch(quote.characterName + ' ' + quote.movie));
  }

  /**
   * Load a rating for this movie use MovieDB API
   * @param {MovieQuote} quote
   * @returns {Observable<Object>}
   */
  loadRating(quote: MovieQuote) {
    return this.httpService.doGet(Config.movieSearch(quote.movie));
  }

  /**
   * Load the image link from localStorage, if
   * it exists, this way we can avoid uncessary
   * network calls (and avoid excessing Googles
   * Custom Search limit quota
   * @param quote
   * @param modifier
   * @returns {string | null}
   */
  getImageFromLocalStorage(quote, modifier = '') {
    return localStorage.getItem(quote.movie + modifier);
  }

  /**
   * Store the retrieved image link in localStorage
   * for retrieval next time without requiring
   * network call.
   * @param {string} key
   * @param {string} image
   * @param modifier
   */
  storeImageInLocalStorage(key: string, image: string, modifier: string = '') {
    localStorage.setItem(key + modifier, image);
  }

  /**
   * Store movie data in localStorage to avoid
   * exceeding quotas
   * @param {string} key
   * @param {object} data
   */
  storeMovieDbInfoInLS(key: string, data: object) {
    localStorage.setItem(`movieDb_${key}`, JSON.stringify(data));
  }

  /**
   * Load data from localStorage and parse to object
   * @param {string} key
   * @returns {any}
   */
  loadMovieDbInfoFromLS(key: string) {
    return JSON.parse(localStorage.getItem(`movieDb_${key}`));
  }
}

/**
 * Partial interface of Google Custom Search Result
 * to give us type hinting for deeply nested image
 * result
 */
export interface GoogleSearchResultPartial {
  items?: {
    link?: string;
  }[];
}

/**
 * Partial interface of MovieDB API
 */
export interface MovieDatabaseSearchResultPartial {
  results?: {
    vote_count?: number;
    vote_average?: number;
    id?: number;
  }[];
}
