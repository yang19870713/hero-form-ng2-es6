import {Component, EventEmitter} from 'angular2/core';
import HeroService from './hero.service';
import {RouteSegment} from 'angular2/router';

@Component({
    selector: "my-hero-detail",
    inputs: ['hero'],
    outputs: ['close'],
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
            <button (click)="save()">Save</button>
        </div>
    `
})
export default class HeroDetailComponent {
    constructor(heroService, rs){
        this.heroService = heroService;
        this.rs = rs;
        this.navigated = false;
        this.close = new EventEmitter();
    }
    static get parameters(){
        return [[HeroService], [RouteSegment]]
    }
    save(){
        this.heroService
            .save(this.hero)
            .then(hero => {
                this.hero = hero;
                this.goBack(hero);
            })
            .catch(error => this.error = error);
    }
    ngOnInit() {
        let id = + this.rs.parameters['id'];
        if(id){
            this.navigated = true;
            this.heroService.getHero(id)
                .then(hero => this.hero = hero);
        }
        else{
            this.navigated = false;
            this.hero = {
                name: "",
                id: null
            }
        }
    }
    goBack(savedHero){
        this.close.emit(savedHero);
        if(this.navigated){
            window.history.back();
        }
    }
}
