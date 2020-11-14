import { Component, OnDestroy, OnInit } from "@angular/core";
import { ClientesService } from "./clientes.service";
import { Cliente } from "./clientes.model";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-clientes",
  templateUrl: "./clientes.page.html",
  styleUrls: ["./clientes.page.scss"],
})
export class ClientesPage implements OnInit, OnDestroy {
  loadedClients: Cliente[] = [];
  private clientSub: Subscription;

  constructor(
    private clientesService: ClientesService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.clientSub = this.clientesService.clientes.subscribe((clientes) => {
      this.loadedClients = clientes;
      this.loadedClients.sort((a, b) => a.lastName.localeCompare(b.lastName));
    });
  }

  ionViewWillEnter() {
    this.loadedClients.sort((a, b) => a.lastName.localeCompare(b.lastName));
  }

  onAddClient() {
    this.router.navigate(["/clientes/new-client"]);
  }

  onEditClient(clientId: string) {
    this.router.navigate([`/clientes/edit-client/${clientId}`]);
  }

  onDeleteClient(id: string) {
    this.alertCtrl
      .create({
        header: "Eliminar Cliente",
        message: "¿Seguro desea eliminar al cliente de su lista?",
        buttons: [
          {
            text: "Eliminar",
            handler: () => {
              this.clientesService.deleteClient(id).subscribe();
            },
          },
          {
            text: "Cancelar",
            handler: () => {
              return;
            },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }

  ngOnDestroy() {
    if (this.clientSub) {
      this.clientSub.unsubscribe();
    }
  }
}
