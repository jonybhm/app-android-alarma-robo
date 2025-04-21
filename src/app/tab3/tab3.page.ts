import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {

  public mi_color:string;

  constructor() {
    this.mi_color = "";
  }

  CambiarColor(color: string){

    this.mi_color = color;
  }

}
