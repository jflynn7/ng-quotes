import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MovieQuote } from '../../interfaces/movie-quote';
import * as dateFns from 'date-fns';

@Component({
  selector: 'app-quote-view',
  templateUrl: './quote-view.component.html',
  styleUrls: ['./quote-view.component.scss']
})
export class QuoteViewComponent implements OnInit {

  @ViewChild('movieImage') movieImage: ElementRef;

  @Input() quote: MovieQuote;

  constructor(private renderer2: Renderer2) { }

  ngOnInit() {
    this.renderer2.setStyle(this.movieImage.nativeElement, 'background-image', `url(${this.quote.image})`);
  }

  toPrettyDate(date: string) {
    return dateFns.format(date, 'DD/MM/YYYY');
  }

}
