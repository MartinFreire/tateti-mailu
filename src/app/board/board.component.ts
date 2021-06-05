import { AfterViewInit, Component, OnInit } from '@angular/core';

import { BoardService } from './board.service';
import { Celda, diagonales, getNewSalaState, jugadores } from '../modelos/board.model';
import { SalasDeJuegoService } from '../servicios/salas-de-juego.service';
import { Observable } from 'rxjs';
import { TableroSalaDeJuegos } from '../modelos/sala-de-juego';
import { debounceTime, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  providers: [BoardService],
})
export class BoardComponent implements OnInit, AfterViewInit {
  state$: Observable<TableroSalaDeJuegos> | undefined;

  constructor(public service: BoardService, private salaSvs: SalasDeJuegoService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.state$ = this.salaSvs.salaSeleccionada$.pipe(
      map((sala) => (sala ? sala : getNewSalaState())),
      // Mapea para obtener solo el tablero
      map((sala) => sala.tablero),
      debounceTime(10),
      // Tap no afecta a this.state$ pero lo aprovecha para actualizar las lineas
      tap((tablero) => this.validarGanador(tablero)),
      tap((tablero) => this.service.limpiarLineas(tablero))
    );
    this.resetGame();
  }

  resetGame() {
    const tableroLimpio: TableroSalaDeJuegos = {
      jugador: 'X',
      ganador: null,
      tablero: {
        celda11: null,
        celda12: null,
        celda13: null,
        celda21: null,
        celda22: null,
        celda23: null,
        celda31: null,
        celda32: null,
        celda33: null,
      },
    };
    this.service.borrarLinea();
    this.salaSvs.actualizarTablero(tableroLimpio);
  }

  clickCelda(state: TableroSalaDeJuegos, posicion: string) {
    if (state.ganador) return;

    const propName = 'celda' + posicion;
    const celdaValActual = state.tablero[propName];

    if (celdaValActual) return;

    state.tablero[propName] = state.jugador;

    const result = this.validarGanador(state);
    if (result) {
      state.ganador = result;
      this.salaSvs.actualizarGanadorTablero(state);
      return;
    }

    if (this.esEmpate(state)) {
      state.ganador = 'empates';
      this.salaSvs.actualizarGanadorTablero(state);
      return;
    }

    // Siguiente jugador
    state.jugador = state.jugador === 'X' ? 'O' : 'X';
    this.salaSvs.actualizarTablero(state);
  }

  esEmpate(state: TableroSalaDeJuegos) {
    return Object.keys(state.tablero).every((key) => state.tablero[key] !== null);
  }

  validarGanador(state: TableroSalaDeJuegos): Celda {
    const tablero = [
      [state.tablero.celda11, state.tablero.celda12, state.tablero.celda13],
      [state.tablero.celda21, state.tablero.celda22, state.tablero.celda23],
      [state.tablero.celda31, state.tablero.celda32, state.tablero.celda33],
    ];

    for (const jugador of jugadores) {
      for (let i = 0; i < tablero.length; i++) {
        const fila = tablero[i];
        if (fila.every((cell) => cell === jugador)) {
          this.service.drawHorizontalLine(i + 1);
          return jugador;
        }
      }

      for (const columnaIdx of [0, 1, 2]) {
        const columna = tablero.map((fila) => fila[columnaIdx]);
        if (columna.every((cell) => cell === jugador)) {
          this.service.drawVerticalLine(columnaIdx + 1);
          return jugador;
        }
      }

      for (const diagonal of diagonales) {
        if (diagonal.posiciones.every(([fila, col]) => tablero[fila][col] === jugador)) {
          this.service.drawDiagonalLine(diagonal.tipo);
          return jugador;
        }
      }
    }

    return null;
  }
}
