import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FechasPage } from './fechas.page';

const routes: Routes = [
  {
    path: '',
    component: FechasPage
  },
  {
    path: 'new-fecha',
    loadChildren: () => import('./new-fecha/new-fecha.module').then( m => m.NewFechaPageModule)
  },
  {
    path: 'detail-fecha/:fechaId',
    loadChildren: () => import('./detail-fecha/detail-fecha.module').then( m => m.DetailFechaPageModule)
  },
  {
    path: 'edit-fecha/:fechaId',
    loadChildren: () => import('./edit-fecha/edit-fecha.module').then( m => m.EditFechaPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FechasPageRoutingModule {}
