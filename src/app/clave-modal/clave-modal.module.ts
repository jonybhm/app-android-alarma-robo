import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClaveModalPageRoutingModule } from './clave-modal-routing.module';

import { ClaveModalPage } from './clave-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClaveModalPageRoutingModule
  ],
  declarations: [ClaveModalPage]
})
export class ClaveModalPageModule {}
