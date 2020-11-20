import { Injectable } from "@angular/core";
import { AlertController, ToastController } from "@ionic/angular";
import { BehaviorSubject } from "rxjs";
import { take, map, tap, delay } from "rxjs/operators";
import { StorageService } from "../storage.service";
import { Cliente } from "./clientes.model";

@Injectable({
  providedIn: "root",
})
export class ClientesService {
  private _clientes = new BehaviorSubject<Cliente[]>([]);

  get clientes() {
    return this._clientes.asObservable();
  }

  constructor(
    private storageService: StorageService,
    private alertCtrl: AlertController,
    private toastController: ToastController
  ) {
    this.clientes.pipe(take(1)).subscribe((clientes) => {
      this.storageService.getClients().then((storageClients) => {
        if (storageClients !== null) {
          this._clientes.next((clientes = storageClients));
        }
      });
    });
  }

  getClient(id: string) {
    return this.clientes.pipe(
      take(1),
      map((clientes) => {
        return { ...clientes.find((c) => c.id === id) };
      })
    );
  }

  increaseOneClientSesion(lastName: string, firstName: string) {
    this.clientes.pipe(take(1)).subscribe((clientes) => {
      const clienteExiste = clientes.find((cliente) => {
        return cliente.firstName === firstName && cliente.lastName === lastName;
      });
      if (clienteExiste !== undefined) {
        this.updateClient(
          clienteExiste.id,
          clienteExiste.firstName,
          clienteExiste.lastName,
          clienteExiste.celPhone,
          clienteExiste.sesiones + 1
        ).subscribe();
      }
    });
  }

  existeCliente(newClient: Cliente) {
    let loadedClientes: Cliente[] = [];
    this.clientes.subscribe((clientes) => {
      loadedClientes = clientes;
    })
    return loadedClientes.find(cliente => {
      return cliente.firstName === newClient.firstName && cliente.lastName === newClient.lastName;
    })
  }

  addClient(
    id: string,
    firstName: string,
    lastName: string,
    celPhone: string,
    sesiones: number
  ) {
    const newClient = new Cliente(id, firstName, lastName, celPhone, sesiones);
    let resultOfAdding = false;
    this.clientes.pipe(take(1)).subscribe(async (clientes) => {
      /*
      const clienteExiste = clientes.find((cliente) => {
       return cliente.firstName === newClient.firstName && cliente.lastName === newClient.lastName;
      });
      */

      const clienteExiste = this.existeCliente(newClient);
      if (clienteExiste !== undefined) {
        this.toastController
          .create({
            color: "dark",
            duration: 450,
            message: `El cliente ${clienteExiste.firstName} ${clienteExiste.lastName} ya existe`,
            position: "top",
          })
          .then((toastEl) => {
            toastEl.present();
          });
      } else {
        this._clientes.next(clientes.concat(newClient));
        resultOfAdding = true;
      }
    });
    return resultOfAdding;
  }

  updateClient(
    clientId: string,
    firstName: string,
    lastName: string,
    celPhone: string,
    sesiones: number
  ) {
    return this.clientes.pipe(
      take(1),
      delay(200),
      tap((clientes) => {
        const updateClientIndex = clientes.findIndex(
          (client) => client.id === clientId
        );
        const updatedClients = [...clientes];
        const oldClient = updatedClients[updateClientIndex];
        updatedClients[updateClientIndex] = new Cliente(
          oldClient.id,
          firstName,
          lastName,
          celPhone,
          sesiones
        );
        this.storageService.updateClient(updatedClients[updateClientIndex]);
        this._clientes.next(updatedClients);
      })
    );
  }

  deleteClient(clientId: string) {
    return this.clientes.pipe(
      take(1),
      tap((clientes) => {
        this.storageService.deleteClient(clientId);
        this._clientes.next(clientes.filter((c) => c.id !== clientId));
      })
    );
  }
}
