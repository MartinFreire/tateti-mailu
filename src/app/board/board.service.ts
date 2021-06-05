import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import 'leader-line';
import { SentidoDiagonal } from '../modelos/board.model';
import { TableroSalaDeJuegos } from '../modelos/sala-de-juego';
declare let LeaderLine: any;

@Injectable()
export class BoardService {
  linea: any = null;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  borrarLinea() {
    if (this.linea) {
      this.linea.remove();
      this.linea = null;
    }
  }

  limpiarLineas(tablero: TableroSalaDeJuegos | null) {
    if (tablero) {
      if (Object.keys(tablero.tablero).every((key) => tablero.tablero[key] === null)) {
        this.borrarLinea();
      }
    }
  }

  demoColores() {
    this.drawLine('11d', '33d');
    this.drawLine('31d', '13d', 'red');
    this.drawLine('11h', '13h', 'brown');
    this.drawLine('21h', '23h', 'brown');
    this.drawLine('31h', '33h', 'brown');
    this.drawLine('11v', '31v', 'green');
    this.drawLine('12v', '32v', 'green');
    this.drawLine('13v', '33v', 'green');
  }

  drawVerticalLine(columna: number | string) {
    this.drawLine(`1${columna}v`, `3${columna}v`);
  }

  drawHorizontalLine(fila: number | string) {
    this.drawLine(`${fila}1h`, `${fila}3h`);
  }

  drawDiagonalLine(tipo: SentidoDiagonal) {
    if (tipo === 'ArribaADerecha') {
      this.drawLine('11d', '33d');
    } else if (tipo === 'AbajoADerecha') {
      this.drawLine('31d', '13d');
    }
  }

  drawLine(start: string, end: string, color = 'blue') {
    this.borrarLinea();

    const startDoc = this.document.getElementById(start);
    const endDoc = this.document.getElementById(end);

    console.log(start, startDoc);
    console.log(end, endDoc);

    if (startDoc && endDoc) {
      this.linea = new LeaderLine({
        start: startDoc,
        end: endDoc,
        path: 'straight',
        color,
        size: 8,
        endPlug: 'behind',
        x: 0,
        y: 0,
      });
    }

    setTimeout(() => this.linea.show(), 100);
    console.log(this.linea);
  }
}
