import { Component, OnInit } from '@angular/core';
import { MovieQuote } from '../../interfaces/movie-quote';
import { QuoteService } from '../../services/quote.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  movieQuotes: MovieQuote[];
  randomQuote: MovieQuote;

  constructor(private quoteService: QuoteService) {}

  ngOnInit() {

    // Load all the quotes
    this.quoteService.quotes$.subscribe((quotes: MovieQuote[]) => {
      this.movieQuotes = quotes;
    });
    this.quoteService.getQuotes();

    // Load the random 'quote of the day'
    this.quoteService.randomQuote$.subscribe((quote: MovieQuote) => {
      this.randomQuote = quote;
    });
    this.quoteService.getRandomQuote();
  }

}
