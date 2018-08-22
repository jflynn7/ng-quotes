import { Component, OnInit } from '@angular/core';
import { QuoteService } from '../../services/quote.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isFiltered: boolean = false;

  constructor(private quoteService: QuoteService) { }

  ngOnInit() {
    this.quoteService.isFiltered$.subscribe((isFiltered: boolean) => {
      this.isFiltered = isFiltered;
    });
  }

  filterQuotes(source: string) {
    this.quoteService.filterBySource(source);
  }

  resetFilters() {
    this.quoteService.resetFilters();
  }

}
