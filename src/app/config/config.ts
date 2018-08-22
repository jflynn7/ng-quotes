/**
 * Main App Config
 */
export class Config {

  // Google Custom Search API
  public static googleApiKey = (): string => 'AIzaSyDAi60djg6CdEsLS4hXF-Dle615jPdqcIE';
  public static searchEngineId = (): string => '014731826016777221950:f1acmmfuy8a';
  public static searchEndpoint = () => 'https://www.googleapis.com/customsearch/v1';
  public static customSearch = (searchText: string) => {
    return `${Config.searchEndpoint()}?key=${Config.googleApiKey()}&cx=
    ${Config.searchEngineId()}&searchType=image&q=${encodeURIComponent(searchText)}`;
  }

  // The Movie DB API
  public static movieDbApiKey = (): string => '19cf18f1c2e16afef97a04d48577fa0a';
  public static movieSearchEndpoint = (): string => 'https://api.themoviedb.org/3/search/movie';
  public static movieSearch = (searchText: string) => {
    return `${Config.movieSearchEndpoint()}?api_key=${Config.movieDbApiKey()}&language=en-US&query=${searchText}
    &page=1&include_adult=false`;
  }


  /**
   * Configurable endpoints to read quote
   * data (in different formats) from
   * different services
   * @returns {string}
   */

  // Endpoints (GoReport)
  public static apiBase = (): string => 'http://movie-quotes-2.herokuapp.com/api/v1';
  public static getAllMovieQuotes = (): string => `${Config.apiBase()}/quotes`;
  public static getQuoteById = (id: number): string => `${Config.apiBase()}/quotes/${id}`;
  public static getRandomQuote = (): string => `${Config.apiBase()}/quotes/random`;

  // Endpoints (Alternative Service)
  public static altApiBase = (): string => './assets/mockData';
  public static getAllAltOneQuotes = (): string => `${Config.altApiBase()}/mockApiOne/quotes.json`;

  // Endpoints (Another Alternative Service)
  public static anotherAltApiBase = (): string => '/assets/mockData';
  public static getAllAltTwoQuotes = (): string => `${Config.altApiBase()}/mockApiTwo/quotes.json`;

  // Wrap up the endpoints in config array
  public static getQuoteEndpoints = (): EndpointConfig[] => {
    return [
      <EndpointConfig> {
        url: Config.getAllMovieQuotes(),
        mapping: Config.getGoReportMapping(),
        source: 'GoReport'
      },
      <EndpointConfig> {
        url: Config.getAllAltOneQuotes(),
        mapping: Config.getAltOneMapping(),
        source: 'AltMovie'
      },
      <EndpointConfig> {
        url: Config.getAllAltTwoQuotes(),
        mapping: Config.getAltTwoMapping(),
        source: 'FilmAlt'
      }
    ];
  }

  /**
   * Quote mapping configuration - Using configurable
   * mapping allows us to retrieve quotes in various
   * formats, and via a mapping service, convert them
   * to a generic, consistent format across the application.
   * @returns {MappingConfig}
   */
  public static getGoReportMapping = (): MappingConfig => {
    return {
      characterName: 'character',
      quote: 'content',
      createdAt: 'created_at',
      movie: 'film',
      id: 'id',
      updatedAt: 'updated_at',
      year: 'year'
    };
  }

  public static getAltOneMapping = (): MappingConfig => {
    return {
      characterName: 'onScreenCharacter',
      quote: 'quote',
      createdAt: 'addedOn',
      movie: 'movieTitle',
      id: 'id',
      updatedAt: 'updatedOn',
      year: 'year'
    };
  }

  public static getAltTwoMapping = (): MappingConfig => {
    return {
      characterName: 'characterName',
      quote: 'quotedContent',
      createdAt: 'add_date',
      movie: 'filmName',
      id: 'quoteId',
      updatedAt: 'update_date',
      year: 'yearOfRelease'
    };
  }

}

/**
 * Define URL and response mapping
 * as pair to use mapping service
 * to convert to MovieQuote
 */
export interface EndpointConfig {
  url?: string;
  mapping?: MappingConfig;
  source?: string;
}

/**
 * Define common properties from
 * different types of response with
 * MappingConfig
 */
export interface MappingConfig {
  characterName?: string;
  quote?: string;
  createdAt?: string;
  movie?: string;
  id?: string;
  updatedAt?: string;
  year?: string;
}
