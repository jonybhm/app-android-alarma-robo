import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {Auth, createUserWithEmailAndPassword,signInWithEmailAndPassword} from '@angular/fire/auth'
import { ErrorService } from '../../app/servicios/error-toast.service';
import { onAuthStateChanged } from 'firebase/auth';
import { signOut } from 'firebase/auth';
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: false,
})
export class Tab4Page implements OnInit {

  usuario:string = "";
  contrasena:string = "";
  mostrar:boolean = false;
  direccion:string = "";
  usuarioNuevo: string = "";
  claveUsuarioNueva: string = "";

  usuarioLogeado: string = "";
  errorLogeo: boolean = false;
  logueado: boolean = false;
  
  constructor(
    public navCtrl: NavController,
    public auth:Auth,
    private error:ErrorService

  ) 
  {}


  ngOnInit() {
    onAuthStateChanged(this.auth, (user) => {
      this.logueado = !!user;
    });
  }

  
  Registrarse()
  {
    createUserWithEmailAndPassword(this.auth, this.usuario, this.contrasena).then((res) => {
      if(res.user.email !== null) this.usuarioLogeado = res.user.email;
      this.errorLogeo = false;
      this.error.Toast.fire(
        {
          title:'Usuario creado con éxito',
          icon:'success'
        }
      )
      
    }).catch((e) => {
      this.errorLogeo = true;
  
      switch(e.code)
      {
        case "auth/invalid-email":
          this.error.Toast.fire(
          {
            title:"Email invalido",
            icon:'error'
          })  
        break;
        case "auth/email-already-in-use":
          this.error.Toast.fire(
          {
            title:"Email ya se encuentra en uso",
            icon:'error'
          })  
        break;
        case "auth/invalid-password":
          this.error.Toast.fire(
          {
            title:"Contraseña invalida",
            icon:'error'
          })  
        break;
        case "auth/weak-password":
          this.error.Toast.fire(
          {
            title:"Contraseña muy débil",
            icon:'error'
          })  
        break;        
        default:
          this.error.Toast.fire(
          {
            title:'Error en el registro',
            icon:'error'
          })  
        break;
      }
    });  
  }

  IniciarSesion()
  {
    signInWithEmailAndPassword(this.auth, this.usuario, this.contrasena).then((res)=>{
      this.errorLogeo = false;
      this.error.Toast.fire(
        {
          title:'Inicio de Sesión exitosa',
          icon:'success'
        }
      )
      

    }).catch((e) => {
      this.errorLogeo = true;
      console.log(e.code);
      switch(e.code)
      {        
        case "auth/invalid-credential":
          this.error.Toast.fire(
            {
              title:'Usuario o contraseña invalidos',
              text:'Ingrese los datos nuevamente',
              icon:'error'
            }
          )
          break;
        case "auth/invalid-email":
          this.error.Toast.fire(
            {
              title:'Email invalido',
              text:'Ingrese los datos nuevamente',
              icon:'error'
            }
          )
          break;
        case "auth/missing-password":
          this.error.Toast.fire(
            {
              title:'Falta contraseña',
              text:'Ingrese los datos nuevamente',
              icon:'error'
            }
          )
          break;
        default:
          this.error.Toast.fire(
            {
              title:'Faltan datos',
              text:'Ingrese los datos nuevamente',
              icon:'error'
            }
          )
          break;
      }
    });
  }

  CerrarSesion() 
  {
    signOut(this.auth).then(() => {

      this.usuario ="";
      this.contrasena="";
      this.error.Toast.fire({
        title: 'Sesión cerrada',
        icon: 'success'
      });
      this.logueado = false;
    });
  }

  Autocompletar(rol:string)
  {
    switch(rol)
    {
      case 'usuario1':
        this.usuario = "maria.utn@gmail.com";
        this.contrasena = "123456";
      break;
      case 'usuario2':
        this.usuario = "lionel.messi@gmail.com";
        this.contrasena = "123456";
      break;
      case 'usuario3':
        this.usuario = "jonydecas@gmail.com";
        this.contrasena = "123456";
      break;      
    }
  }
}
