import {Component} from 'angular2/core';
import Hero from './hero';
import * as styles from './hero-form.component.ng.scss';
import {NgModel} from '@angular/common/index';

@Component({
    selector:'hero-form',
    template: `
        <div class="container" [hidden]="submitted">
            <h1>Hero Form</h1>
            <form *ngIf="active" (ngSubmit)="onSubmit()" #heroForm="ngForm">
                <div class="form-group">
                    <label for="name">Name</label>
                    <!--Two way data binding -->
                    <input type="text" class="form-control" required
                            [(ngModel)]="model.name"
                            ngControl="name" #name="ngForm">
                    <div [hidden]="name.valid || name.pristine" class="alert alert-danger">Name is required</div>

                    <!--One way data binding -->
                    <!--input type="text" class="form-control" required
                            [value]="model.name"
                            (keyup)="model.name=$event.target.value"/-->

                    <!--One way data binding with ngmodel directive-->
                    <!--input type="text" class="form-control" required
                            [ngModel]="model.name"
                            (ngModelChange)="model.name=$event.target.value"/-->
                </div>
                <div class="form-group">
                    <label for="power">Hero Power</label>
                    <select class="form-control" required
                        [(ngModel)]="model.power">
                        <option *ngFor="let p of powers" [value]="p">{{p}}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="alterEgo">Alter Ego</label>
                    <input type="text" class="form-control" [(ngModel)]="model.alterEgo">
                </div>
                <button type="submit" class="btn btn-default"
                    [disabled]="!heroForm.form.valid">Sumbit</button>
                <button type="button" (click)="newHero()" class="btn btn-default">New Hero</button>
            </form>
        </div>

        <div [hidden]="!submitted" class="container">
            <h2>You submitted the following:</h2>
            <div class="row">
                <div class="col-xs-3">Name</div>
                <div class="col-xs-9  pull-left">{{ model.name }}</div>
            </div>
            <div class="row">
                <div class="col-xs-3">Alter Ego</div>
                <div class="col-xs-9 pull-left">{{ model.alterEgo }}</div>
            </div>
            <div class="row">
                <div class="col-xs-3">Power</div>
                <div class="col-xs-9 pull-left">{{ model.power }}</div>
            </div>
            <br>
            <button class="btn btn-default" (click)="submitted=false">Edit</button>
        </div>
    `
})
export default class HeroFormComponent{
    constructor(){
        this.powers = ['Really Smart',
                    'Super Flexible',
                    'Super Hot',
                    'Weather Changer'];
        this.model = new Hero(18, 'Dr IQ', this.powers[0], 'chuck Overstreet');

        this.submitted = false;

        this.active = true;
    }
    newHero(){
        this.model = new Hero(42, '', '');
        this.active = false;
        setTimeout(() => this.active = true); //re-create form to restore the pristine state
    }
    onSubmit(){
        this.submitted = true;
    }
    //TODO
    get diagnostic(){
        return JSON.stringify(this.model);
    }

}
