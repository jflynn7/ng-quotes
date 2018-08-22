# GoMovieQuote

This is an Angular implementation of a popular tech test, which uses a movie quote api. 

### Implementation Details
This implementation is slightly different, in that, as well as retrieving the quotes from a single API (per the ask), it also uses movie quotes in two other formats (from separate mock APIs) to demonstrate data mapping from different sources into a common displayable format.

### Adding Images via Google Custom Search
After the quotes are retrieved from the various sources, and combined into a single list of common entities, the application uses a Google Custom Search API to retrieve images based on the character who spoke.

##### Google Custom Search Quota
In order to avoid exceeding the Google Custom search quota, and reduce network calls, the results from each search are stored in `localStorage` for retrieval the next time the application is run (or refreshed) using the movie name as the key, and the image URL as the value.

Additionally, for the quote of the day, the entire search is stored under a different key, as a JSON string version of a `GoogleSearchResultPartial` interface. This way we can pull multiple images from the search, for use in the `FeaturedQuote` component, without making additional API calls to the Google Custom Search.

### Adding Movie Ratings via MovieDB API
Once the images are retrieved, and added to the common quote interface, a second API call is made out to the [MovieDb](https://www.themoviedb.org/) API to perform a search on the movie name, in order to get a movie rating for each movie.

Likewise, these searches are stored in local storage to reduce unnecessary network calls as the app is navigated.

### Modular Development
Whilst the application, at present, only has one module (`core.module`), it is set-up to use a multi-module approach, allowing lazy loading of module children via lazy-loaded routes. The intention is to add a quiz module, in which quiz questions are randomly derived from the quotes to allow a unique quiz for everyone who takes it. But, time.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io). Unit tests are still to be added for many of the services, but, again, time.
