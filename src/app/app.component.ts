import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './servicios/firebase.service';
import { SalasDeJuegoService } from './servicios/salas-de-juego.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ta-te-ti';

  constructor(private firebaseSvc: FirebaseService, public salasSvc: SalasDeJuegoService) {}

  ngOnInit() {
    this.firebaseSvc.initializeFirebase();
    this.salasSvc.init();
  }
}
