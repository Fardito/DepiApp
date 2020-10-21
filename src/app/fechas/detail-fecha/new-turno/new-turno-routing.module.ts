import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewTurnoPage } from './new-turno.page';

const routes: Routes = [
  {
    path: '',
    component: NewTurnoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewTurnoPageRoutingModule {}
