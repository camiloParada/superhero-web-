import { Component, Input, ViewEncapsulation } from '@angular/core';

import { Superhero } from '../../interfaces/superhero.interface';

@Component({
  selector: 'section-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class InfoComponent {
  @Input() superheroInfo!: Superhero;

  public flipCard!: boolean;
  public tabActive: number;

  constructor() {
    this.flipCard = false;
    this.tabActive = 1;
  }

  flipCardAction() {
    this.flipCard = !this.flipCard;
  }
}
