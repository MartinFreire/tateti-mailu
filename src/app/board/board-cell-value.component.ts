import { Component, Input } from '@angular/core';
import { Celda } from '../modelos/board.model';

@Component({
  selector: 'app-board-cell-value',
  template: `
    <div fxFlex fxLayout="column" fxFlexAlign="center">
      <div fxLayout="row" fxFlexAlign="stretch">
        <div fxFlex></div>
        <div fxFlex>
          <mat-icon *ngIf="value">{{ value === 'X' ? 'pets' : 'cruelty_free' }}</mat-icon>
          <p *ngIf="!value">&nbsp;</p>
        </div>
        <div fxFlex></div>
      </div>
    </div>
  `,
  styles: [
    `
      mat-icon {
        height: 12rem;
        width: 12rem;
        font-size: 12rem;
      }
    `,
  ],
})
export class BoardCellValueComponent {
  @Input() value: Celda = null;
}
