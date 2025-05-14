import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SonidosService {

  constructor(
        private platform: Platform
  ) { }

  ejecutarSonido(nombreArchivo:string) 
  {
  
    if (!nombreArchivo)
    {
      console.error('No se pudo obtener el nombre del archivo');
      return;
    }
  
    const rutaAudio = `../../assets/sonidos/${nombreArchivo}.mp3`;
  
    console.log('Reproduciendo:', rutaAudio);


    const audio = new Audio(rutaAudio);
    audio.load();
    audio.play();

    audio.onended = () => {
    };
  }
}
