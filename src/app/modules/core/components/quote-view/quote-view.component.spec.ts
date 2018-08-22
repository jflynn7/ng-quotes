import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteViewComponent } from './quote-view.component';
import { MovieQuote } from '../../interfaces/movie-quote';

describe('QuoteViewComponent', () => {
  let component: QuoteViewComponent;
  let fixture: ComponentFixture<QuoteViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteViewComponent);
    component = fixture.componentInstance;
    component.quote = <MovieQuote> {
      image: 'testimage.jpg'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should convert a datetime stamp to a pretty date in the format DD/MM/YYYY', () => {
    expect(component.toPrettyDate('2018-07-25T14:41:09.694Z')).toEqual('25/07/2018');
  });

});
