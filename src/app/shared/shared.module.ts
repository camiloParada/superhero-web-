import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

import { InfoComponent } from './components/info/info.component';
import { BattleComponent } from './components/battle/battle.component';
import { LoaderComponent } from './components/loader/loader.component';


@NgModule({
  exports: [InfoComponent, BattleComponent, LoaderComponent],
  declarations: [InfoComponent, BattleComponent, LoaderComponent],
  imports: [CommonModule, NgbNavModule],
})
export class SharedModule {}
