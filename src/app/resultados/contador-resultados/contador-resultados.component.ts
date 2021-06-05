import { Component, OnInit } from '@angular/core';
import { ResultadosService } from '../resultados.service';

@Component({
  selector: 'app-contador-resultados',
  templateUrl: './contador-resultados.component.html',
  styleUrls: ['./contador-resultados.component.scss'],
})
export class ContadorResultadosComponent implements OnInit {
  constructor(public service: ResultadosService) {}

  ngOnInit(): void {}
}
