import {Component} from 'angular2/core';
import {Routes, Route, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import HeroesComponent from './heroes.component';
import DashboardComponent from './dashboard.component';
import HeroDetailComponent from './hero-detail.component';
import HeroService from './hero.service';
console.log(ROUTER_PROVIDERS);
@Component({
    selector: 'my-app',
    template: `
        <h1>{{title}}</h1>
        <nav>
            <a [routerLink]="['/heroes']">Heroes</a>
            <a [routerLink]="['/dashboard']">Dashboard</a>
        </nav>
        <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES],
    providers: [HeroService,  ROUTER_PROVIDERS]
})
@Routes([
    new Route({
        path: '/heroes',
        component: HeroesComponent
    }),
    new Route({
        path: '/dashboard',
        component: DashboardComponent,
        useAsDefault: true
    }),
    new Route({
        path: '/detail/:id',
        component: HeroDetailComponent
    })
])
export default class App{
    constructor(){
        this.title = 'Tour of Heros';
    }
};
