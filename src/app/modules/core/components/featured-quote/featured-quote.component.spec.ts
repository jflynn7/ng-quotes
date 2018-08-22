import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedQuoteComponent } from './featured-quote.component';

describe('FeaturedQuoteComponent', () => {
  let component: FeaturedQuoteComponent;
  let fixture: ComponentFixture<FeaturedQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
