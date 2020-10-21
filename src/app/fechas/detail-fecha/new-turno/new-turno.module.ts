import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewTurnoPageRoutingModule } from './new-turno-routing.module';

import { NewTurnoPage } from './new-turno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewTurnoPageRoutingModule
  ],
  declarations: [NewTurnoPage]
})
export class NewTurnoPageModule {}
