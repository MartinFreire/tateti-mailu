import { Injectable } from '@angular/core';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Subject } from 'rxjs';
import { SalaDeJuego } from '../modelos/sala-de-juego';

const SALAS_COLL = 'salas';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private app: firebase.app.App;

  constructor() {
    const firebaseConfig = {
      apiKey: 'AIzaSyCLtwKe4KO_50Niy0Qy6OO-mVLoZRJS5f0',
      authDomain: 'tateti-mailu.firebaseapp.com',
      projectId: 'tateti-mailu',
      storageBucket: 'tateti-mailu.appspot.com',
      messagingSenderId: '314477198422',
      appId: '1:314477198422:web:0dc68692d367b2af0ccff7',
    };
    this.app = firebase.initializeApp(firebaseConfig);
  }

  initializeFirebase() {}

  getSalasDeJuego() {
    const db = this.app.firestore();
    const stream = new Subject<SalaDeJuego[]>();

    const unsubscribe = db.collection(SALAS_COLL).onSnapshot((snap) => {
      const values = snap.docs.map((doc) => doc.data() as SalaDeJuego);
      stream.next(values);
    });

    return { stream, unsubscribe };
  }

  guardarSalaDeJuego(sala: SalaDeJuego) {
    const db = this.app.firestore();
    return db.collection(SALAS_COLL).doc(sala.codigo).set(sala);
  }
}
