import { Injectable } from '@angular/core';
import Swal  from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  //================ALERTAS================
Toast = Swal.mixin({
  toast: true,
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});
}

