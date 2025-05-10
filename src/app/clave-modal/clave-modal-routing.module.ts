import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClaveModalPage } from './clave-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ClaveModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClaveModalPageRoutingModule {}
