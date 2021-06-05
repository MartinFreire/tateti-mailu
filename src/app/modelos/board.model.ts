import { SalaDeJuego } from './sala-de-juego';

export type Celda = 'X' | 'O' | null;
export type SentidoDiagonal = 'ArribaADerecha' | 'AbajoADerecha';

export const jugadores: Celda[] = ['X', 'O'];

export const diagonales = [
  {
    tipo: 'ArribaADerecha' as SentidoDiagonal,
    posiciones: [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
  },
  {
    tipo: 'AbajoADerecha' as SentidoDiagonal,
    posiciones: [
      [2, 0],
      [1, 1],
      [0, 2],
    ],
  },
];

export function getNewSalaState(): SalaDeJuego {
  return {
    codigo: '',
    jugadorOriginal: null,
    jugadorInvitado: null,
    resultados: {
      O: 0,
      X: 0,
      empates: 0,
    },
    tablero: {
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
    },
  };
}
