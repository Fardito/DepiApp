import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FechasPageRoutingModule } from './fechas-routing.module';

import { FechasPage } from './fechas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FechasPageRoutingModule
  ],
  declarations: [FechasPage]
})
export class FechasPageModule {}
