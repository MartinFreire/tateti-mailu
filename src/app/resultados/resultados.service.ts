import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ResultadosSalaDeJuegos } from '../modelos/sala-de-juego';
import { SalasDeJuegoService } from '../servicios/salas-de-juego.service';

@Injectable({
  providedIn: 'root',
})
export class ResultadosService {
  private state = new BehaviorSubject<ResultadosSalaDeJuegos>({
    O: 0,
    X: 0,
    empates: 0,
  });

  state$ = this.state.asObservable();

  constructor(private salasService: SalasDeJuegoService) {
    this.salasService.salaSeleccionada$.subscribe((sala) => {
      this.state.next({
        O: sala?.resultados.O || 0,
        X: sala?.resultados.X || 0,
        empates: sala?.resultados.empates || 0,
      });
    });
  }

  agregarGanador(jugador: 'O' | 'X' | 'empates') {
    const state = this.state.getValue();
    state[jugador] += 1;
    this.state.next(state);
  }

  actualizarResultados(resultados: ResultadosSalaDeJuegos) {
    this.state.next(resultados);
  }
}
