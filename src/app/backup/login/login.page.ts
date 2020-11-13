import { Component, OnInit } from "@angular/core";
import "@codetrix-studio/capacitor-google-auth";
import { Plugins } from "@capacitor/core";
import { BackupService } from "../backup.service";
import { AlertController, LoadingController } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  constructor(
    private backupService: BackupService,
    private loadingController: LoadingController,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  async googleSignUp() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.backupService.signUpWithGoogle().then(
      () => {
        loading.dismiss();
        this.router.navigateByUrl("/backup", { replaceUrl: true });
      },
      async (err) => {
        loading.dismiss();
        const alert = await this.alertController.create({
          header: "Error al iniciar sesion",
          message: "Vuelva a intentarlo",
          buttons: ["OK"],
        });
        alert.present();
      }
    );
  }

  
}
