import {Component} from 'angular2/core';
import HeroService from './hero.service';
import {RouteSegment} from 'angular2/router';

@Component({
    selector: "my-hero-detail",
    inputs: ['hero'],
    template: `
        <div *ngIf="hero">
            <h2>{{hero.name}} details!</h2>
            <div>
                <label>id: {{hero.id}}</label>
            </div>
            <div>
                <label>name: </label>
                <input [(ngModel)]="hero.name" placeholder="name"/>
            </div>
            <button (click)="goBack()">Back</button>
        </div>
    `
})
export default class HeroDetailComponent {
    constructor(heroService, rs){
        this.heroService = heroService;
        this.rs = rs;
    }
    static get parameters(){
        return [[HeroService], [RouteSegment]]
    }
    ngOnInit() {
        let id = + this.rs.parameters['id'];
        this.heroService.getHero(id)
            .then(hero => this.hero = hero);
    }
    goBack(){
        window.history.back();
    }
}
