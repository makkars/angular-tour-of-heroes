import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Hero } from '../model/hero';
import { HEROES } from '../model/mock-heroes';
import { MessageService } from './message.service';

@Injectable()
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    // Todo: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }

  getHero(id: number): Observable<Hero> {
    // Todo: send the message _after_ fetching the hero
    // Note the backticks ( ` ) that define a JavaScript template literal for embedding the id.
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }
}
