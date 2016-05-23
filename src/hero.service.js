import { Injectable } from 'angular2/core';
import {Http, Headers} from 'angular2/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export default class HeroService{
    constructor(http){
        this.http = http;
        this.heroesUrl = 'src/heroes';
    }
    getHeroes(){
        return this.http.get(this.heroesUrl)
                    .toPromise()
                    .then(resp => resp.json().data)
                    .catch(this.handleError);
    }
    post(hero){
        let headers = new Headers({
            'Content-Type': 'apllicaiton/json'
        });

        return this.http
                    .post(this.heroesUrl, JSON.stringify(hero), {headers: headers})
                    .toPromise()
                    .then(resp => resp.json().data)
                    .catch(this.handleError);
    }
    put(hero){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.heroesUrl}/${hero.id}`;

        return this.http
                    .put(url, JSON.stringify(hero), {headers: headers})
                    .toPromise()
                    .then(() => hero)
                    .catch(this.handleError);
    }
    delete(hero){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.heroesUrl}/${hero.id}`;

        return this.http
                    .delete(url, headers)
                    .toPromise
                    .catch(this.handleError);
    }
    save(hero){
        if(hero.id){
            return this.put(hero);
        }
        return this.post(hero);
    }
    handleError(error){
        console.error('An error occured ', error);
        return Promise.reject(error.message || error);
    }
    getHeroesSlowly(){
        return new Promise(
            resolve => setTimeout(this.getHeroes(), 2000)
        )
    }
    getHero(id){
        //return Promise.resolve(HEROES)
        return this.getHeroes()
                    .then(heroes => heroes.filter(hero => hero.id === id)[0]);
    }
    static get parameters(){
        return [[Http]];
    }
}
