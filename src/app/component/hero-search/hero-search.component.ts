import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Hero } from '../../model/hero';
import { HeroService } from '../../service/hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  /*
     Remember that the component class does not subscribe to the heroes$ 
     observable. That's the job of the AsyncPipe in the template. 
  */
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    /*
      the ngOnInit() method pipes the searchTerms observable 
      through a sequence of RxJS operators that reduce the number 
      of calls to the searchHeroes(), ultimately returning an
       observable of timely hero search results (each a Hero[]).
    */
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      /*
        calls the search service for each search term that makes it 
        through debounce and distinctUntilChanged. It cancels and 
        discards previous search observables, 
        returning only the latest search service observable. 
      */
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }
}