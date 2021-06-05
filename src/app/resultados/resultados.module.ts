import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContadorResultadosComponent } from './contador-resultados/contador-resultados.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [ContadorResultadosComponent],
  imports: [CommonModule, MaterialModule],
  exports: [ContadorResultadosComponent],
})
export class ResultadosModule {}
