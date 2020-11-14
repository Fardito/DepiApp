import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { LoadingController, NavController } from "@ionic/angular";
import { Subscription } from "rxjs";
import { Cliente } from "../clientes.model";
import { ClientesService } from "../clientes.service";

@Component({
  selector: "app-edit-client",
  templateUrl: "./edit-client.page.html",
  styleUrls: ["./edit-client.page.scss"],
})
export class EditClientPage implements OnInit, OnDestroy {
  client: Cliente;
  form: FormGroup;
  clientSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientesService,
    private router: Router,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("clientId")) {
        this.navCtrl.navigateBack("/clientes");
        return;
      }
      this.clientSub = this.clientService
        .getClient(paramMap.get("clientId"))
        .subscribe((client) => {
          this.client = client;
        });
      this.form = new FormGroup({
        firstName: new FormControl(this.client.firstName, {
          updateOn: "blur",
          validators: [Validators.required],
        }),
        lastName: new FormControl(this.client.lastName, {
          updateOn: "blur",
          validators: [Validators.required],
        }),
        celPhone: new FormControl(this.client.celPhone, {
          updateOn: "blur",
          validators: [Validators.required],
        }),
        sesiones: new FormControl(this.client.sesiones, {
          updateOn: "blur",
          validators: [Validators.required],
        })
      });
    });
  }

  onUpdateClient() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl
      .create({
        message: "Actualizando Cliente...",
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.clientService
          .updateClient(
            this.client.id,
            this.form.value.firstName,
            this.form.value.lastName,
            this.form.value.celPhone,
            this.form.value.sesiones
          )
          .subscribe(() => {
            loadingEl.dismiss();
            this.form.reset();
            this.router.navigate(["/clientes"]);
          });
      });
  }

  ngOnDestroy() {
    if (this.clientSub) {
      this.clientSub.unsubscribe();
    }
  }
}
