import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailFechaPageRoutingModule } from './detail-fecha-routing.module';

import { DetailFechaPage } from './detail-fecha.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailFechaPageRoutingModule
  ],
  declarations: [DetailFechaPage]
})
export class DetailFechaPageModule {}
