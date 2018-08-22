import {
  Component,
  ElementRef,
  Input, OnChanges,
  Renderer2,
  ViewChild
} from '@angular/core';
import { MovieQuote } from '../../interfaces/movie-quote';
import * as dateFns from 'date-fns';

@Component({
  selector: 'app-featured-quote',
  templateUrl: './featured-quote.component.html',
  styleUrls: ['./featured-quote.component.scss']
})
export class FeaturedQuoteComponent implements OnChanges {

  @ViewChild('imageBox') imageBox: ElementRef;
  @Input() quote: MovieQuote;

  constructor(private renderer2: Renderer2) { }

  ngOnChanges() {
    const imageBoxes: any[] = this.imageBox.nativeElement.querySelectorAll('.image-box');
    for (let x = 0; x < imageBoxes.length; x++) {
      if (this.quote && this.quote.images) {
        this.renderer2.setStyle(imageBoxes[x], 'background-image', `url(${this.quote.images[x]})`);
      }
    }
  }

  toPrettyDate(date: string) {
    return dateFns.format(date, 'DD/MM/YYYY');
  }

}
