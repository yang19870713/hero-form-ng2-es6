import {Component} from 'angular2/core';
import HeroService from './hero.service';
import * as styles from 'stylesheets/dashboard.component.scss';
import {Router} from 'angular2/router';

@Component({
    selector: 'my-dashboard',
    template:`
        <h3>Top Heroes</h3>
        <div class="{{styles.wrapper}}">
            <div *ngFor="let hero of heroes"
                (click)="gotoDetail(hero)"
                class="{{styles.col}}">
                <div class="{{styles.hero}}">
                    <h4>{{hero.name}}</h4>
                </div>
            </div>
        </div>
    `,
    styles: [styles.toString()]
})
export default class DashboardComponent {
    constructor(heroService, router){
        this.heroService = heroService;
        this.router = router;
        this.styles = {
            wrapper: styles.grid +' ' +styles["grid-pad"],
            col: styles["col-1-4"],
            hero: styles.module + ' ' + styles.hero
        }
    }
    gotoDetail(hero){
        let link = '/detail/:' + hero.id;
        this.router.navigateByUrl(link);
    }
    ngOnInit(){
        this.heroService.getHeroes()
            .then(heroes => this.heroes=heroes.slice(1,5));
    }
    static get parameters(){
        return [[HeroService], [Router]];
    }
}
