import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

import { InfoComponent } from './components/info/info.component';
import { BattleComponent } from './components/battle/battle.component';


@NgModule({
  exports: [InfoComponent, BattleComponent],
  declarations: [InfoComponent, BattleComponent],
  imports: [CommonModule, NgbNavModule],
})
export class SharedModule {}
