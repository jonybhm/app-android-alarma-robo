import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { SplashPage } from './splash/splash.page';
import { Flashlight } from '@awesome-cordova-plugins/flashlight/ngx';
import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';
import { SpinnerPage } from './spinner/spinner.page';
import { LottieComponent } from 'ngx-lottie';
import { playerFactory } from 'src/main';
import { provideLottieOptions } from 'ngx-lottie';



@NgModule({
  declarations: [AppComponent, SplashPage,SpinnerPage],
  imports: [    BrowserModule, IonicModule.forRoot(), AppRoutingModule,LottieComponent],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig)), 
      provideAuth(() => getAuth()), 
      provideFirestore(() => getFirestore()), 
      provideStorage(() => getStorage()), 
      provideLottieOptions({player:playerFactory}),
      Flashlight,
      Vibration
      ],
  bootstrap: [AppComponent],
})
export class AppModule {}
