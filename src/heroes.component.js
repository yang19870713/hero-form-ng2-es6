import {Component} from 'angular2/core';
import HeroDetailComponent from './hero-detail.component';
import HeroService from './hero.service';
import * as styles from 'stylesheets/style.scss';
import {Router} from 'angular2/router';

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
        <button (click)="addHero()">Add new Hero</button>
        <button (click)="delete(hero, $event)">Delete</button>
        <div *ngIf="addingHero">
            <my-hero-detail (close)="close($event)"></my-hero-detail>
        </div>
        <div *ngIf="selectedHero">
            <h2>
                {{selectedHero.name}} is my hero
            </h2>
            <button (click)="gotoDetail()">View Details</button>
        </div>
    `,
    syles: [styles.toString()],
    directives: [HeroDetailComponent]
})
export default class HeroesComponent{
    constructor(heroService, router) {
        this.title = 'Tour of Heros';
        this.heroService = heroService;
        this.styles = styles;
        this.router = router;
    }
    addHero() {
        this.addingHero = true;
        this.selectedHero = null;
    }
    delete(hero, event){
        event.stopPropagation();
        this.heroService
            .delete(hero)
            .then(resp => {
                this.heroes = this.heroes.filter(h => h!==hero);
                if(this.selectedHero === hero){
                    this.selectedHero  = null;
                }
            })
            .catch(erorr=> this.error = error);
    }
    close(savedHero){
        this.addingHero = false;
        if(savedHero){
            this.heroService.getHeroes();
        }
    }
    ngOnInit(){
        this.heroService.getHeroes()
        //this.heroService.getHeroesSlowly()
            .then(heroes => this.heroes = heroes);
    }
    static get parameters(){
        return [[HeroService], [Router]];
    }
    onSelect(hero){
        this.selectedHero = hero;
    }
    gotoDetail(){
        let link = '/detail/:' + this.selectedHero.id;
        this.router.navigateByUrl(link);
    }
};
