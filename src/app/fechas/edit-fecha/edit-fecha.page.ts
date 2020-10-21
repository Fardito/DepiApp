import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Fecha } from '../fechas.model';
import { FechasService } from '../fechas.service';

@Component({
  selector: 'app-edit-fecha',
  templateUrl: './edit-fecha.page.html',
  styleUrls: ['./edit-fecha.page.scss'],
})
export class EditFechaPage implements OnInit {
  @ViewChild('f') form: NgForm;

  myDate: string;
  fecha: Fecha;
  fechaSub: Subscription;
  
  constructor(private fechaService: FechasService, private router: Router, private route: ActivatedRoute, private navCtrl: NavController) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("fechaId")) {
        this.navCtrl.navigateBack("/fechas");
        return;
      }
      this.fechaSub = this.fechaService
        .getFecha(paramMap.get("fechaId"))
        .subscribe((fecha) => {
          this.fecha = fecha;
          console.log(this.fecha.id);
        });
      
    });

    
  }

  onEditFecha(){
    this.fechaService.updateFecha(this.fecha.id,this.form.value['fecha-nueva']).subscribe();
    this.form.reset();
    this.router.navigate(['/fechas']);
  }
}
