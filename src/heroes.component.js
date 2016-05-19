import {Component} from 'angular2/core';
import HeroDetailComponent from './hero-detail.component';
import HeroService from './hero.service';
import * as styles from 'stylesheets/style.scss';

@Component({
    selector: 'my-heroes',
    template: `

        <h2>My Heroes</h2>
        <ul class="{{styles.heroes}}">
            <li *ngFor="let hero of heroes"
                    (click)="onSelect(hero)"
                    class="{{hero === selectedHero?styles.selected:null}}">
                 <span class="{{styles.badge}}">{{hero.id}}</span> {{hero.name}}
            </li>
        </ul>
        <my-hero-detail [hero]="selectedHero"></my-hero-detail>
    `,
    syles: [styles.toString()],
    directives: [HeroDetailComponent]
})
export default class HeroesComponent{
    constructor(heroService) {
        this.title = 'Tour of Heros';
        this.heroService = heroService;
        this.styles = styles;
    }
    ngOnInit(){
        this.heroService.getHeroes()
        //this.heroService.getHeroesSlowly()
            .then(heroes => this.heroes = heroes);
    }
    static get parameters(){
        return [[HeroService]]
    }
    onSelect(hero){
        this.selectedHero = hero;
    }
};
