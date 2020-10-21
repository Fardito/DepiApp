import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewFechaPageRoutingModule } from './new-fecha-routing.module';

import { NewFechaPage } from './new-fecha.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewFechaPageRoutingModule
  ],
  declarations: [NewFechaPage]
})
export class NewFechaPageModule {}
