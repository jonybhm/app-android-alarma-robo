import { Component } from '@angular/core';
import { Flashlight } from '@awesome-cordova-plugins/flashlight/ngx';
import { AlertController } from '@ionic/angular';
import { getAuth, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import Swal  from 'sweetalert2';
import { ErrorService } from '../servicios/error-toast.service';
import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';
import { ModalController } from '@ionic/angular';
import { ClaveModalPage } from '../clave-modal/clave-modal.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {

  alarmaActivada:boolean = false;
  orientacionListener: any;
  movimientoListener: any;
  ultimaPosicion: string = '';
  claveValida: boolean = true;

  audioActivo:boolean = false;


  
  constructor(
    private flashlight: Flashlight,
    private vibration: Vibration,
    private error: ErrorService,
    private modalController: ModalController
  ) {

  }
  
  activarAlarma() 
  {
  
    this.alarmaActivada = !this.alarmaActivada;

    if (this.alarmaActivada) 
    {
      
      this.iniciarDeteccion();
    } 
    else 
    {
      this.detenerDeteccion();
      this.pedirClave();
    }  


  }


  iniciarDeteccion() 
  {
    this.orientacionListener = (event: DeviceOrientationEvent) => {
      const beta = event.beta ?? 0;
      const gamma = event.gamma ?? 0;
      let posicionActual = '';
  
      if (beta > 70) {
        posicionActual = "vertical";
      } else if (beta < 10 && beta > -10) {
        posicionActual = "horizontal";
      }
  
      this.procesarPosicion(posicionActual);
    };
  
    this.movimientoListener = (event: DeviceMotionEvent) => {
      const x = event.accelerationIncludingGravity?.x ?? 0;
      let posicionActual = '';
  
      if (x > 3) {
        posicionActual = "derecha";
      } else if (x < -3) {
        posicionActual = "izquierda";
      }
  
      this.procesarPosicion(posicionActual);
    };
  
    window.addEventListener('deviceorientation', this.orientacionListener);
    window.addEventListener('devicemotion', this.movimientoListener);


  }
  

  detenerDeteccion() {
    window.removeEventListener('deviceorientation', this.orientacionListener);
    window.removeEventListener('devicemotion', this.movimientoListener);
  }

  procesarPosicion(posicionActual: string) {
    if (posicionActual && posicionActual !== this.ultimaPosicion) {
      this.ultimaPosicion = posicionActual;
  
      switch (posicionActual) {
        case 'derecha':
          this.emitirSonido('derecha.mp3');
          break;
        case 'izquierda':
          this.emitirSonido('izquierda.mp3');
          break;
        case 'horizontal':
          this.vibrar();
          this.emitirSonido('horizontal.mp3');
          break;
        case 'vertical':
          this.encenderLinterna();
          this.emitirSonido('vertical.mp3');
          break;
      }
    }
  }

  emitirSonido(nombre: string) 
  {
    const audio = new Audio(`../../assets/sonidos/${nombre}`);
    
    if(!this.audioActivo)
    {
      audio.load();
      audio.play();
      this.audioActivo = true;
    }
    
    audio.onended=()=>{
      this.audioActivo = false;
    }
  }

  vibrar() 
  {
    this.vibration.vibrate(5000);
    
  }

  encenderLinterna() 
  {
    this.flashlight.switchOn();
    setTimeout(() => {
      this.flashlight.switchOff();
    }, 5000);
  }

  async pedirClave() {
    const modal = await this.modalController.create({
      component: ClaveModalPage,

    });
  
    modal.onDidDismiss().then(async (result) => {
      if (result.data) {
        const password = result.data.password;
        const auth = getAuth();
        const user = auth.currentUser;
    
        if (user && user.email) {
          const credential = EmailAuthProvider.credential(user.email, password);
          try {
            await reauthenticateWithCredential(user, credential);
            console.log('Contraseña correcta');
            this.error.Toast.fire({
              icon: 'success',
              title: 'Autenticación correcta'
            });

          } catch (error) {
            console.log('Contraseña incorrecta');
            this.vibrar();
            this.encenderLinterna();
            this.emitirSonido('alarma.mp3');
            this.error.Toast.fire({
              icon: 'error',
              title: 'Contraseña incorrecta'
            });
            this.activarAlarma();

          }
        }
      }
    });
  
    await modal.present();
  }
}
