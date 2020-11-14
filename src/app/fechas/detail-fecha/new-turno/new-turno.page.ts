import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular";
import { Subscription } from "rxjs";
import { Cliente } from "src/app/clientes/clientes.model";
import { ClientesService } from "src/app/clientes/clientes.service";
import { Fecha } from "../../fechas.model";
import { FechasService } from "../../fechas.service";
import { Turno } from '../turno.model';
import { TurnoService } from "../turno.service";

@Component({
  selector: "app-new-turno",
  templateUrl: "./new-turno.page.html",
  styleUrls: ["./new-turno.page.scss"],
})
export class NewTurnoPage implements OnInit, OnDestroy {
  @ViewChild("f") form: NgForm;

  loadedClients: Cliente[];
  clientSub: Subscription;
  fechaSub: Subscription;
  fechaActual: Fecha;

  constructor(
    private clientService: ClientesService,
    private activeRoute: ActivatedRoute,
    private navCtrl: NavController,
    private fechaService: FechasService,
    private turnoService: TurnoService
  ) {}

  ngOnInit() {
    this.clientSub = this.clientService.clientes.subscribe((clientes) => {
      this.loadedClients = clientes.sort((a,b) => a.lastName.localeCompare(b.lastName));
    });

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
  }

  onAddTurno() {
    const id = (Math.random() * 6 + 1).toString();
    this.turnoService.addTurno(id,this.form.value['fecha-turno'],
    this.form.value['cliente'],
    +this.form.value['precio'],
    this.fechaActual.id);
    this.navCtrl.navigateBack(
      `/fechas/detail-fecha/${this.fechaActual.id}`
    );
  }
  
  ngOnDestroy() {
    if (this.clientSub) {
      this.clientSub.unsubscribe();
    }
    if (this.fechaSub) {
      this.fechaSub.unsubscribe();
    }
  }
}
