import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { SuperheroName } from '../shared/interfaces/superhero-name.interface';
import { Superhero } from '../shared/interfaces/superhero.interface';

@Injectable({
  providedIn: 'root',
})
export class SuperheroService {
  private apiUrl: string;

  private http = inject(HttpClient);

  constructor() {
    this.apiUrl = environment.apiUrl;
  }

  getAll() {
    return this.http.get<{
      rows: SuperheroName[];
      count: number;
    }>(`${this.apiUrl}/superheroes`);
  }

  getOne(id: number) {
    return this.http.get<Superhero>(`${this.apiUrl}/superhero/${id}`);
  }
}
