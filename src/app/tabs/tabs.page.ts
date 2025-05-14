import { Component } from '@angular/core';
import { SonidosService } from '../servicios/sonidos.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';  

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false,
})
export class TabsPage {

    constructor(
    private router: Router,
    private sonidosService: SonidosService
  ) {
        this.escucharCambiosDeRuta();
  }

  escucharCambiosDeRuta() 
  {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        console.log('Cambiando de ruta a:', event.url);
        this.sonidosService.ejecutarSonido('navegacion');
      });
  }

}
