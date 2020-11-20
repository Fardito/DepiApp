import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { delay } from 'rxjs/operators';
import { BackupService } from '../backup.service';

@Component({
  selector: 'app-backup',
  templateUrl: './backup.page.html',
  styleUrls: ['./backup.page.scss'],
})
export class BackupPage implements OnInit {

  constructor(private backupService: BackupService, private router: Router, private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  storeBackup(){
    this.loadingCtrl
      .create({
        message: "Subiendo datos...",
      })
      .then((loadingEl) => {
        loadingEl.present();
          this.backupService.storeBackup();
          loadingEl.dismiss();
        
        
      });
    
  }

  downloadBackup(){
    this.loadingCtrl
      .create({
        message: "Descargando...",
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.backupService.downloadBackup() 
          .then(() => {
            loadingEl.dismiss();
            this.router.navigate(["/clientes"]);
          });
      });
    
  }

  logout(){
    this.backupService.singOut().then(() => {
      this.router.navigateByUrl("/login", { replaceUrl: true });
    });
  }
}
