import { Component } from '@angular/core';

import { SpinnerService } from './servicios/spinner.service';
import { SpinnerPageModule } from './spinner/spinner.module';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  isLoading = false;

  constructor(
    private spinnerService: SpinnerService,
  ) {
    this.spinnerService.loading$.subscribe(value => {
      this.isLoading = value;
    });
  }

  showSplash = true;

  ngOnInit() 
  {
    setTimeout(() => {
      this.showSplash = false;
    }, 4000);
  }
}
