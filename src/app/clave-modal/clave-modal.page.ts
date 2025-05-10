import { Component, OnInit , Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-clave-modal',
  templateUrl: './clave-modal.page.html',
  styleUrls: ['./clave-modal.page.scss'],
  standalone:false
})
export class ClaveModalPage {


  contrasena: string = "";

  constructor(private modalCtrl: ModalController) {}

  cerrar() {
    this.modalCtrl.dismiss();
  }

  enviar() {
    this.modalCtrl.dismiss({
      password: this.contrasena 
    });
  }

}
