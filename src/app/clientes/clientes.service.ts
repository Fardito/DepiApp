import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators';
import { StorageService } from '../storage.service';
import { Cliente } from './clientes.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private _clientes = new BehaviorSubject<Cliente[]>([
    
  ]);

  get clientes(){
    return this._clientes.asObservable();
  }

  constructor(private storageService: StorageService) { 
    this.clientes.pipe(take(1)).subscribe( clientes => {
      storageService.getClients().then( storageClients => {
        if(storageClients !== null){
          this._clientes.next(clientes = storageClients);
        }
      })
    })
  }

  getClient(id: string){
    return this.clientes.pipe(take(1), map( clientes => {
      return { ...clientes.find(c => c.id === id)};
    }));
  }

  addClient(id: string, firstName: string, lastName: string, celPhone: string){
    const newClient = new Cliente(id,firstName,lastName,celPhone);
    this.storageService.addClient(newClient);
    this.clientes.pipe(take(1)).subscribe( clientes => {
      this._clientes.next(clientes.concat(newClient));
    });
  }

  updateClient(clientId: string, firstName: string, lastName: string, celPhone:string){
    return this.clientes.pipe(
      take(1),
      delay(200),
      tap( clientes => {
        const updateClientIndex = clientes.findIndex( client => client.id === clientId);
        const updatedClients = [...clientes];
        const oldClient = updatedClients[updateClientIndex];
        updatedClients[updateClientIndex] = new Cliente(oldClient.id, firstName, lastName, celPhone);
        this.storageService.updateClient(updatedClients[updateClientIndex]);
        this._clientes.next(updatedClients);
      })
      );
  }

  deleteClient(clientId: string){
    return this.clientes.pipe(
      take(1),
      tap( clientes => {
        this.storageService.deleteClient(clientId);
        this._clientes.next(clientes.filter( c => c.id !== clientId))
      })
    );
  }
}
