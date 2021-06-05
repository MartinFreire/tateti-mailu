import { Injectable } from '@angular/core';
import { SalaDeJuego, TableroSalaDeJuegos } from '../modelos/sala-de-juego';
import { FirebaseService } from './firebase.service';
import { BehaviorSubject } from 'rxjs';
import { getNewSalaState } from '../modelos/board.model';

@Injectable({ providedIn: 'root' })
export class SalasDeJuegoService {
  private salas = new BehaviorSubject<SalaDeJuego[]>([]);
  private salaSeleccionada = new BehaviorSubject<SalaDeJuego | null>(null);

  salas$ = this.salas.asObservable();
  salaSeleccionada$ = this.salaSeleccionada.asObservable();

  constructor(private fb: FirebaseService) {}

  init() {
    const { stream, unsubscribe } = this.fb.getSalasDeJuego();
    // TODO handle unsubscribe
    stream.subscribe((salas) => {
      this.salas.next(salas);
      const selectedOld = this.salaSeleccionada.getValue();
      const selected = salas.find((sala) => selectedOld?.codigo === sala.codigo) || null;
      this.salaSeleccionada.next(selected);
    });
  }

  crearSala() {
    const newSala = getNewSalaState();
    newSala.codigo = this.generarRandomCode();
    return this.fb.guardarSalaDeJuego(newSala);
  }

  seleccionarSala(sala: SalaDeJuego) {
    this.salaSeleccionada.next(sala);
  }

  actualizarGanadorTablero(tablero: TableroSalaDeJuegos) {
    const sala = this.salaSeleccionada.getValue();
    if (sala) {
      sala.tablero = tablero;
      if (tablero.ganador !== null) {
        sala.resultados[tablero.ganador] += 1;
      }
      this.fb.guardarSalaDeJuego(sala);
    }
  }

  actualizarTablero(tablero: TableroSalaDeJuegos) {
    const sala = this.salaSeleccionada.getValue();
    if (sala) {
      sala.tablero = tablero;
      this.fb.guardarSalaDeJuego(sala);
    }
  }

  generarRandomCode() {
    const length = 5;
    const result = [];
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return result.join('');
  }
}
