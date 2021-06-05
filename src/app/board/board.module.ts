import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import { MaterialModule } from '../material/material.module';
import { BoardCellValueComponent } from './board-cell-value.component';
import { ResultadosModule } from '../resultados/resultados.module';

@NgModule({
  declarations: [BoardComponent, BoardCellValueComponent],
  exports: [BoardComponent],
  imports: [CommonModule, MaterialModule, ResultadosModule],
})
export class BoardModule {}
