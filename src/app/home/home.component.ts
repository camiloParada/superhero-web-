import { Component, inject, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { SuperheroService } from './superhero.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public superhero!: string;
  public superheroes!: { id: number; name: string }[];
  public superheroesFiltered!: { id: number; name: string }[];

  private _unsubscribeAll: Subject<any>;

  private readonly _superheroService = inject(SuperheroService);

  constructor() {
    this._unsubscribeAll = new Subject();
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
    this.superheroesFiltered = this.superheroes.filter((sp) =>
      sp.name.includes(this.superhero)
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
