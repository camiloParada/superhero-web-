import { Component, inject, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { SuperheroService } from './superhero.service';
import { SuperheroName } from '../shared/interfaces/superhero-name.interface';
import { Superhero } from '../shared/interfaces/superhero.interface';
import { AuthenticationService } from '../auth/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public isLoading: boolean;
  public notification: string;
  public superhero!: string;
  public superheroes!: SuperheroName[];
  public superheroesFiltered!: SuperheroName[];
  public superheroesForBattle: Superhero[];
  public superheroInfo!: Superhero;
  public superheroSelected!: SuperheroName | null;

  private _unsubscribeAll: Subject<any>;
  private readonly _superheroService = inject(SuperheroService);
  private readonly _authenticationService = inject(AuthenticationService);

  constructor() {
    this.isLoading = false;
    this._unsubscribeAll = new Subject();
    this.superheroesForBattle = [];
    this.notification = '';
  }

  ngOnInit(): void {
    this.getSuperheroes();
  }

  getSuperheroes() {
    this._superheroService
      .getAll()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res) => {
        this.superheroes = res.rows;
      });
  }

  filterSuperheroes() {
    if (this.superhero.trim() === '') {
      return;
    }

    this.notification = '';

    this.superheroesFiltered = this.superheroes.filter((sp) =>
      sp.name.toLowerCase().includes(this.superhero.toLowerCase())
    );
  }

  selectSuperhero(superhero: SuperheroName) {
    this.isLoading = true;
    this.superhero = superhero.name;
    this.superheroSelected = superhero;

    this._superheroService
      .getOne(this.superheroSelected.id)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res) => {
        if (res.response === 'success') {
          this.superheroInfo = res;
          this.superheroesFiltered = [];
          this.isLoading = false;
        }
      });
  }

  chooseSuperheroForBattle(superhero: Superhero) {
    if (this.superheroesForBattle.length === 2) {
      return;
    }

    if (this.superheroesForBattle.find((s) => s.id === superhero.id)) {
      this.notification = 'The character has already been selected';
      return;
    }

    this.notification = '';

    this.superheroesForBattle.push(superhero);
  }

  logout() {
    this._authenticationService.logout();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
