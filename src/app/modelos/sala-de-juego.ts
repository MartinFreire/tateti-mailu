import { Celda } from './board.model';

export interface ResultadosSalaDeJuegos {
  O: number;
  X: number;
  empates: number;
}

export interface TableroSalaDeJuegos {
  jugador: Celda;
  ganador: Celda | 'empates';
  tablero: { [k: string]: Celda };
}

export interface SalaDeJuego {
  codigo: string;
  jugadorOriginal: string | null;
  jugadorInvitado: string | null;
  resultados: ResultadosSalaDeJuegos;
  tablero: TableroSalaDeJuegos;
}
