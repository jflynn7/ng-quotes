import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { QuoteViewComponent } from './components/quote-view/quote-view.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FeaturedQuoteComponent } from './components/featured-quote/featured-quote.component';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  declarations: [
    QuoteViewComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    NavBarComponent,
    FeaturedQuoteComponent
  ],
  exports: [
    QuoteViewComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    NavBarComponent,
    FeaturedQuoteComponent
  ]
})
export class CoreModule { }
