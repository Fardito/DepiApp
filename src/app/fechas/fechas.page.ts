import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Fecha } from "./fechas.model";
import { FechasService } from "./fechas.service";

@Component({
  selector: "app-fechas",
  templateUrl: "./fechas.page.html",
  styleUrls: ["./fechas.page.scss"],
})
export class FechasPage implements OnInit, OnDestroy {
  loadedFechas: Fecha[];
  relevantFechas: Fecha[];
  private fechaSub: Subscription;
  segmentModel = "actuales";

  constructor(private router: Router, private fechasService: FechasService) {}

  ngOnInit() {
    this.fechaSub = this.fechasService.fechas.subscribe((fechas) => {
      this.loadedFechas = fechas;
      //REVISAR
      this.filterFechas(this.segmentModel);
    });
    
  }

  onAddFecha() {
    this.router.navigate(["/fechas/new-fecha"]);
  }

  //Compare if Date 1 is bigger than Date 2
  private compareFecha(date1: Date, date2: Date){
    let esMayor = false;
    if (date1.getFullYear() >= date2.getFullYear()){
      if(date1.getFullYear() === date2.getFullYear()){
        if(date1.getMonth() >= date2.getMonth()){
          if(date1.getMonth() === date2.getMonth()){
           if(date1.getDate() >= date2.getDate()){
             esMayor = true;
           } 
          } else{
            esMayor = true;
          }
        } 
      } else {
        esMayor = true;
      }
    }
    
    return esMayor;
  }

  onFilterUpdate(event: CustomEvent) {
    //REVISAR
    this.filterFechas(event.detail.value);
  }

  private filterFechas(estado: string) {
    if (estado === "actuales") {
      this.relevantFechas = this.loadedFechas.filter(
        (fecha) => this.compareFecha(new Date(fecha.date), new Date())

      );
    } else {

      this.relevantFechas = this.loadedFechas.filter(
        (fecha) => !this.compareFecha(new Date(fecha.date), new Date())
      );
    }
  }

  onOpen(fechaId: string) {
    this.router.navigate([`/fechas/detail-fecha/${fechaId}`]);
  }

  ngOnDestroy() {
    if (this.fechaSub) {
      this.fechaSub.unsubscribe();
    }
  }
}
