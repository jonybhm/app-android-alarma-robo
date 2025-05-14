import { Component, OnInit, Input} from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.page.html',
  styleUrls: ['./spinner.page.scss'],
  standalone:false
})
export class SpinnerPage {

  @Input() visible = false;

  options: AnimationOptions = {
    path: '/assets/spinner.json',
    autoplay: true,
    loop: true
  };
}
