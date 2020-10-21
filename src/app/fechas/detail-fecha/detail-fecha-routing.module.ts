import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailFechaPage } from './detail-fecha.page';

const routes: Routes = [
  {
    path: '',
    component: DetailFechaPage
  },
  {
    path: 'new-turno',
    loadChildren: () => import('./new-turno/new-turno.module').then( m => m.NewTurnoPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailFechaPageRoutingModule {}
