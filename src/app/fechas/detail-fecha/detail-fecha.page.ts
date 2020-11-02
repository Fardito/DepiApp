import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController, IonReorderGroup, NavController } from "@ionic/angular";
import { ItemReorderEventDetail } from '@ionic/core';
import { Subscription } from "rxjs";
import { Fecha } from "../fechas.model";
import { FechasService } from "../fechas.service";
import { Turno } from './turno.model';
import { TurnoService } from './turno.service';

@Component({
  selector: "app-detail-fecha",
  templateUrl: "./detail-fecha.page.html",
  styleUrls: ["./detail-fecha.page.scss"],
})
export class DetailFechaPage implements OnInit, OnDestroy {
  fechaActual: Fecha;
  fechaSub: Subscription;
  loadedTurnos: Turno[];
  turnoSub: Subscription;

  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  constructor(
    private activeRoute: ActivatedRoute,
    private navCtrl: NavController,
    private fechaService: FechasService,
    private router: Router,
    private alertCtrl: AlertController,
    private turnoService: TurnoService
  ) {}

  ngOnInit() {
    this.activeRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("fechaId")) {
        this.navCtrl.navigateBack("/fechas");
        return;
      }
      this.fechaSub = this.fechaService
        .getFecha(paramMap.get("fechaId"))
        .subscribe((fecha) => {
          this.fechaActual = fecha;
        });
    });

    this.turnoSub = this.turnoService.turnos.subscribe( turnos => {
      this.loadedTurnos = turnos.filter( t => t.fechaId === this.fechaActual.id).sort((a,b) => a.hora.localeCompare(b.hora));
    })
  }

  onEditFecha(){
    this.router.navigate([`/fechas/edit-fecha/${this.fechaActual.id}`]);
  }
  

  onAddTurno(){
    this.router.navigate([`/fechas/detail-fecha/${this.fechaActual.id}/new-turno`]);
  }

  onDeleteTurno(id: string){
    this.alertCtrl.create({
      header: 'Eliminar Turno',
      message: '¿Seguro que desea eliminar el turno?',
      buttons: [
        {
          text: 'Eliminar',
          handler: () => {
            this.turnoService.deleteTurno(id).subscribe();
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
            return;
          }
        }
      ]
    }).then( alertEl => {
      alertEl.present();
    });
    
  }

  onDeleteFecha(id: string) {
    this.alertCtrl.create({
      header: 'Eliminar Fecha',
      message: '¿Seguro que desea eliminar la fecha?',
      buttons: [
        {
          text: 'Eliminar',
          handler: () => {
            this.fechaService.deleteFecha(id).subscribe();
            this.router.navigate(["/fechas"]);
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
            return;
          }
        }
      ]
    }).then( alertEl => {
      alertEl.present();
    });
  }

  ngOnDestroy() {
    if (this.fechaSub) {
      this.fechaSub.unsubscribe();
    }
    if(this.turnoSub){
      this.turnoSub.unsubscribe();
    }
  }
}
