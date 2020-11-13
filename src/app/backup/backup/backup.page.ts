import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackupService } from '../backup.service';

@Component({
  selector: 'app-backup',
  templateUrl: './backup.page.html',
  styleUrls: ['./backup.page.scss'],
})
export class BackupPage implements OnInit {

  constructor(private backupService: BackupService, private router: Router) { }

  ngOnInit() {
  }

  storeBackup(){
    this.backupService.storeBackup();
  }

  logout(){
    this.backupService.singOut().then(() => {
      this.router.navigateByUrl("/login", { replaceUrl: true });
    });
  }
}
