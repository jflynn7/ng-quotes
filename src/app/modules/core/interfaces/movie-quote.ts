export class MovieQuote {
  characterName: string;
  quote: string;
  createdAt: string;
  movie: string;
  id: number;
  updatedAt: string;
  year: number;
  image: string;
  source: string;
  rating: number;
  movieDbId: number;
  images?: string[];

  /**
   * Constructor for generic movie quote class.
   * Used in mapping service, along with App Config
   * to create MovieQuote class from various responses
   * @param {string} character
   * @param {string} content
   * @param {string} created_at
   * @param {string} film
   * @param {number} id
   * @param {string} updated_at
   * @param {number} year
   */
  constructor(characterName: string, quote: string, createdAt: string, movie: string,
              id: number, updatedAt: string, year: number, source?: string, image?: string,
              rating?: number, movieDbId?: number) {
    this.characterName = characterName;
    this.quote = quote;
    this.createdAt = createdAt;
    this.movie = movie;
    this.id = id;
    this.updatedAt = updatedAt;
    this.year = year;
    this.image = image;
    this.source = source;
    this.rating = rating;
    this.movieDbId = movieDbId;
  }
}
