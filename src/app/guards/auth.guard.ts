import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { ErrorService } from '../../app/servicios/error-toast.service';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router, 
    private auth: Auth,
    private error:ErrorService
  ) {}

  canActivate(): Promise<boolean> {


    

    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(this.auth, (user) => {
        unsubscribe();
        if (user) 
        {
          resolve(true);
        } 
        else
        {
             
            this.error.Toast.fire({
              title: 'Debe iniciar sesión',
              text: 'Redirigiendo al ingreso',
              icon: 'error'
            });
          
          this.router.navigate(['/tabs/tab4']);
          resolve(false);
        }
      });
    });
  }
}
