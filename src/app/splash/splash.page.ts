import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SonidosService } from '../servicios/sonidos.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone:false
})
export class SplashPage implements OnInit {

  constructor(
    public router:Router,
    
        private sonido: SonidosService
  ) { }

  ngOnInit(
  ) {    this.sonido.ejecutarSonido('intro');

  }
}
