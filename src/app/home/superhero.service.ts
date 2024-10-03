import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuperheroService {
  private apiUrl: string;

  private http = inject(HttpClient);

  constructor() {
    this.apiUrl = environment.apiUrl;
  }

  getAll() {
    return this.http.get<{ rows: { id: number; name: string; }[]; count: number; } >(
      `${this.apiUrl}/superheroes`
    );
  }
}
