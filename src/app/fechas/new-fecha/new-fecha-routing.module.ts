import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewFechaPage } from './new-fecha.page';

const routes: Routes = [
  {
    path: '',
    component: NewFechaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewFechaPageRoutingModule {}
