import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Cliente } from './clientes/clientes.model';
import { Turno } from './fechas/detail-fecha/turno.model';
import { Fecha } from './fechas/fechas.model';


const CLIENTS_KEY = 'my-clients';
const FECHAS_KEY = 'my-fechas';
const TURNOS_KEY = 'my-turnos';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  // Client Storage

  addClient(client: Cliente): Promise<any>{
    return this.storage.get(CLIENTS_KEY).then( (clients: Cliente[]) => {
      if(clients){
        clients.push(client);
        return this.storage.set(CLIENTS_KEY, clients);
      } else {
        return this.storage.set(CLIENTS_KEY, [client]);
      }
    })
  }

  getClients(): Promise<Cliente[]>{
    return this.storage.get(CLIENTS_KEY);
  }

  updateClient(client: Cliente): Promise<any>{
    return this.storage.get(CLIENTS_KEY).then( (clients: Cliente[]) => {
      if(!clients || clients.length === 0){
        return null;
      }

      let newClients: Cliente[] = [];
      for(let tempClient of clients){
        if(tempClient.id === client.id){
          newClients.push(client);
        } else{
          newClients.push(tempClient);
        }
      }

      return this.storage.set(CLIENTS_KEY, newClients);
    })
  }

  deleteClient(id: string): Promise<Cliente>{
    return this.storage.get(CLIENTS_KEY).then( (clients: Cliente[]) => {
      if(!clients || clients.length === 0){
        return null;
      }
      let toKeep: Cliente[] = [];
      for(let tempClient of clients){
        if(tempClient.id !== id){
          toKeep.push(tempClient);
        } 
      }

      return this.storage.set(CLIENTS_KEY, toKeep);
    })

  }

  /*
  
  ----------------------------------------------------------------------------------------------------------------
  ----------------------------------------------------------------------------------------------------------------

  */

  // Fecha Storage

  addFecha(fecha: Fecha): Promise<any>{
    return this.storage.get(FECHAS_KEY).then( (fechas: Fecha[]) => {
      if(fechas){
        fechas.push(fecha);
        return this.storage.set(FECHAS_KEY, fechas);
      } else {
        return this.storage.set(FECHAS_KEY, [fecha]);
      }
    })
  }

  getFechas(): Promise<Fecha[]>{
    return this.storage.get(FECHAS_KEY);
  }

  updateFecha(fecha: Fecha): Promise<any>{
    return this.storage.get(FECHAS_KEY).then( (fechas: Fecha[]) => {
      if(!fechas || fechas.length === 0){
        return null;
      }

      let newFechas: Fecha[] = [];
      for(let tempFecha of fechas){
        if(tempFecha.id === fecha.id){
          newFechas.push(fecha);
        } else{
          newFechas.push(tempFecha);
        }
      }

      return this.storage.set(FECHAS_KEY, newFechas);
    })
  }

  deleteFecha(id: string): Promise<Fecha>{
    return this.storage.get(FECHAS_KEY).then( (fechas: Fecha[]) => {
      if(!fechas || fechas.length === 0){
        return null;
      }
      let toKeep: Fecha[] = [];
      for(let tempFecha of fechas){
        if(tempFecha.id !== id){
          toKeep.push(tempFecha);
        } 
      }

      return this.storage.set(FECHAS_KEY, toKeep);
    })

  }


   /*
  
  ----------------------------------------------------------------------------------------------------------------
  ----------------------------------------------------------------------------------------------------------------

  */

  // Turnos Storage

  addTurno(turno: Turno): Promise<any>{
    return this.storage.get(TURNOS_KEY).then( (turnos: Turno[]) => {
      if(turnos){
        turnos.push(turno);
        return this.storage.set(TURNOS_KEY, turnos);
      } else {
        return this.storage.set(TURNOS_KEY, [turno]);
      }
    })
  }

  getTurnos(): Promise<Turno[]>{
    return this.storage.get(TURNOS_KEY);
  }


  deleteTurno(id: string): Promise<Turno>{
    return this.storage.get(TURNOS_KEY).then( (turnos: Turno[]) => {
      if(!turnos || turnos.length === 0){
        return null;
      }
      let toKeep: Turno[] = [];
      for(let tempTurno of turnos){
        if(tempTurno.id !== id){
          toKeep.push(tempTurno);
        } 
      }

      return this.storage.set(TURNOS_KEY, toKeep);
    })

  }
}
