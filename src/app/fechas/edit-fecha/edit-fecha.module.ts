import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditFechaPageRoutingModule } from './edit-fecha-routing.module';

import { EditFechaPage } from './edit-fecha.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditFechaPageRoutingModule
  ],
  declarations: [EditFechaPage]
})
export class EditFechaPageModule {}
