import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Fecha } from './fechas.model';
import { FechasService } from './fechas.service';

@Component({
  selector: 'app-fechas',
  templateUrl: './fechas.page.html',
  styleUrls: ['./fechas.page.scss'],
})
export class FechasPage implements OnInit, OnDestroy {

  loadedFechas: Fecha[];
  private fechaSub: Subscription;

  constructor(private router: Router, private fechasService: FechasService) { }

  ngOnInit() {
    this.fechaSub = this.fechasService.fechas.subscribe( fechas => {
      this.loadedFechas = fechas;
    })
  }

  onAddFecha(){
    this.router.navigate(['/fechas/new-fecha']);
  }

  onOpen(fechaId: string){
    this.router.navigate([`/fechas/detail-fecha/${fechaId}`]);
  }

  ngOnDestroy(){
    if(this.fechaSub){
      this.fechaSub.unsubscribe();
    }
  }
}
