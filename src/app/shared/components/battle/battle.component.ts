import { Component, Input } from '@angular/core';
import { Superhero } from '../../interfaces/superhero.interface';

@Component({
  selector: 'section-battle',
  templateUrl: './battle.component.html',
  styleUrl: './battle.component.scss',
})
export class BattleComponent {
  @Input() superheroesForBattle!: Superhero[];

  public countdown: number;
  public fightStatus: number;
  public fightResultsOpponentOne: number;
  public fightResultsOpponentTwo: number;
  public fightWinner!: string;
  public fightStarting: boolean;

  private countdownInterval: any;
  private fightInterval: any;

  constructor() {
    this.countdown = 5;
    this.fightStatus = 50;
    this.fightResultsOpponentOne = 0;
    this.fightResultsOpponentTwo = 0;
    this.fightStarting = false;
  }

  startFight() {
    const opponentOne = this.superheroesForBattle[0].powerstats;
    const opponentTwo = this.superheroesForBattle[1].powerstats;
    this.fightStarting = true;
    this.fightWinner = '';

    this.intelligenceFight(
      +opponentOne.intelligence,
      +opponentTwo.intelligence
    );
    this.speedFight(+opponentOne.speed, +opponentTwo.speed);
    this.powerFight(+opponentOne.power, +opponentTwo.power);
    this.strengthFight(+opponentOne.strength, +opponentTwo.strength);
    this.durabilityFight(+opponentOne.durability, +opponentTwo.durability);
    this.combatFight(+opponentOne.combat, +opponentTwo.combat);

    this.countdownInterval = setInterval(() => {
      this.countdown--;

      if (this.countdown === 0) {
        clearInterval(this.countdownInterval);
        this.fightResults();
      }
    }, 1000);
  }

  removeOpponent(index: number) {
    this.fightWinner = '';
    this.superheroesForBattle.splice(index, 1);
  }

  intelligenceFight(opponentOneValue: number, opponentTwoValue: number) {
    if (opponentOneValue > opponentTwoValue) {
      this.fightResultsOpponentOne += 1;
    } else if (opponentOneValue < opponentTwoValue) {
      this.fightResultsOpponentTwo += 1;
    } else {
      this.fightResultsOpponentOne += 1;
      this.fightResultsOpponentTwo += 1;
    }
  }

  speedFight(opponentOneValue: number, opponentTwoValue: number) {
    if (opponentOneValue > opponentTwoValue) {
      this.fightResultsOpponentOne += 2;
    } else if (opponentOneValue < opponentTwoValue) {
      this.fightResultsOpponentTwo += 2;
    } else {
      this.fightResultsOpponentOne += 2;
      this.fightResultsOpponentTwo += 2;
    }
  }

  powerFight(opponentOneValue: number, opponentTwoValue: number) {
    if (opponentOneValue > opponentTwoValue) {
      this.fightResultsOpponentOne += 3;
    } else if (opponentOneValue < opponentTwoValue) {
      this.fightResultsOpponentTwo += 3;
    } else {
      this.fightResultsOpponentOne += 3;
      this.fightResultsOpponentTwo += 3;
    }
  }

  strengthFight(opponentOneValue: number, opponentTwoValue: number) {
    if (opponentOneValue > opponentTwoValue) {
      this.fightResultsOpponentOne += 4;
    } else if (opponentOneValue < opponentTwoValue) {
      this.fightResultsOpponentTwo += 4;
    } else {
      this.fightResultsOpponentOne += 4;
      this.fightResultsOpponentTwo += 4;
    }
  }

  durabilityFight(opponentOneValue: number, opponentTwoValue: number) {
    if (opponentOneValue > opponentTwoValue) {
      this.fightResultsOpponentOne += 5;
    } else if (opponentOneValue < opponentTwoValue) {
      this.fightResultsOpponentTwo += 5;
    } else {
      this.fightResultsOpponentOne += 5;
      this.fightResultsOpponentTwo += 5;
    }
  }

  combatFight(opponentOneValue: number, opponentTwoValue: number) {
    if (opponentOneValue > opponentTwoValue) {
      this.fightResultsOpponentOne += 6;
    } else if (opponentOneValue < opponentTwoValue) {
      this.fightResultsOpponentTwo += 6;
    } else {
      this.fightResultsOpponentOne += 6;
      this.fightResultsOpponentTwo += 6;
    }
  }

  fightResults() {
    let countLapsed = 0;
    this.fightInterval = setInterval(() => {
      countLapsed++;
      this.fightStatus = this.randomIntFromInterval(10, 90);

      if (countLapsed === 8) {
        clearInterval(this.fightInterval);

        if (this.fightResultsOpponentOne > this.fightResultsOpponentTwo) {
          this.fightStatus = 100;
        } else if (
          this.fightResultsOpponentOne < this.fightResultsOpponentTwo
        ) {
          this.fightStatus = 0;
        } else {
          const random = Math.random();

          if (Math.round(random)) {
            this.fightStatus = 100;
          } else {
            this.fightStatus = 0;
          }
        }

        setTimeout(() => {
          if (this.fightStatus === 100) {
            this.fightWinner = 'ONE';
          } else {
            this.fightWinner = 'TWO';
          }

          this.fightStarting = false;
          this.countdown = 5;
        }, 1000);
      }
    }, 1000);
  }

  randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  ngOnDestroy(): void {
    clearInterval(this.fightInterval);
  }
}
