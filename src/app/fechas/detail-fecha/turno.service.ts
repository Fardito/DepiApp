import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { StorageService } from 'src/app/storage.service';
import { Turno } from '../detail-fecha/turno.model';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  private _turnos = new BehaviorSubject<Turno[]>([

  ]);

  get turnos(){
    return this._turnos.asObservable();
  }

  constructor(private storageService: StorageService) { 
    this.turnos.pipe(take(1)).subscribe( turnos => {
      storageService.getTurnos().then( storageTurnos => {
        if(storageTurnos !== null){
          this._turnos.next(turnos = storageTurnos);
        }
      })
    })
  }

  addTurno(id: string,hora: string, nombre: string, precio: number, fechaId: string){
    const newTurno = new Turno(id,hora, nombre, precio, fechaId);
    this.storageService.addTurno(newTurno);
    this.turnos.pipe(take(1)).subscribe( turnos => {
      this._turnos.next(turnos.concat(newTurno));
    })
  }

  deleteTurno(id: string){
    return this.turnos.pipe(
      take(1),
      tap( turnos => {
        this.storageService.deleteTurno(id);
        this._turnos.next(turnos.filter(t => t.id !== id))
      })
    )
  }
}
