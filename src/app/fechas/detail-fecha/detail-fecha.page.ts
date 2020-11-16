import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController, IonReorderGroup, NavController, Platform, ToastController } from "@ionic/angular";
import { Subscription } from "rxjs";
import { Fecha } from "../fechas.model";
import { FechasService } from "../fechas.service";
import { Turno } from './turno.model';
import { TurnoService } from './turno.service';
import { ActionSheetController } from '@ionic/angular';
import { ClientesService } from 'src/app/clientes/clientes.service';
import { StorageService } from 'src/app/storage.service';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FilesystemDirectory, Plugins } from '@capacitor/core';
const { Filesystem } = Plugins;
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: "app-detail-fecha",
  templateUrl: "./detail-fecha.page.html",
  styleUrls: ["./detail-fecha.page.scss"],
})
export class DetailFechaPage implements OnInit, OnDestroy {
  fechaActual: Fecha;
  fechaSub: Subscription;
  loadedTurnos: Turno[];
  turnoSub: Subscription;
  pdfObj : any;

  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  constructor(
    private activeRoute: ActivatedRoute,
    private navCtrl: NavController,
    private fechaService: FechasService,
    private router: Router,
    private alertCtrl: AlertController,
    private turnoService: TurnoService,
    private actionSheetController: ActionSheetController,
    private clientService: ClientesService,
    private toastController: ToastController,
    private storageService: StorageService,
    private plt: Platform,
    private fileOpener: FileOpener
  ) {

  }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("fechaId")) {
        this.navCtrl.navigateBack("/fechas");
        return;
      }
      this.fechaSub = this.fechaService
        .getFecha(paramMap.get("fechaId"))
        .subscribe((fecha) => {
          this.fechaActual = fecha;
        });
    });

    this.turnoSub = this.turnoService.turnos.subscribe( turnos => {
      this.loadedTurnos = turnos.filter( t => t.fechaId === this.fechaActual.id).sort((a,b) => a.hora.localeCompare(b.hora));
    })
  }

  createPdf(){
    let j = "";
    this.loadedTurnos.forEach(turno => {
      j = j + turno.hora + " - " + turno.nombre + " " + "$" + turno.precio.toString() + "\n";
    })
    const docDefinition = {
      content: [
        {text: 'Turnos', style: 'header'},
        
        {
          style: 'tableExample',
          table: {
            
            body: [ 
            [{
              text: j
            }]
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 24,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          fontSize: 16,
          margin: [0, 5, 0, 15]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      }
    }
   
    
     this.pdfObj = pdfMake.createPdf(docDefinition);
     this.downloadPdf();

  }

  downloadPdf(){
    if(this.plt.is('cordova')){
      
      this.pdfObj.getBase64(async (data) => {
        try {
          let path = `turnos.pdf`;

          const result = await Filesystem.writeFile({
            path: path,
            data: data,
            directory: FilesystemDirectory.Data
          }).then((writeFileResult) => {
            console.log('File Written');
            Filesystem.getUri({
                directory: FilesystemDirectory.Data,
                path: path
            }).then((getUriResult) => {
                console.log(getUriResult);
                const path = getUriResult.uri;
                this.fileOpener.open(path, 'application/pdf')
                .then(() => console.log('File is opened'))
                .catch(error => console.log('Error openening file', error));
            }, (error) => {
                console.log(error);
            });
          });
          console.log('writeFile complete');;

          //console.log("llegue 1");
          //this.fileOpener.open(`${result.uri}`, 'application/pdf');
          //console.log("llegue 2");
        } catch (error) {
          console.error('Unable to write file', error)
        }
      })
    } else {
      this.pdfObj.download();
    }
  }

  async fechaActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Acciones',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Eliminar Fecha',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.onDeleteFecha(this.fechaActual.id);
        }
      }, {
        text: 'Editar Fecha',
        icon: 'pencil',
        handler: () => {
          this.onEditFecha();
        }
      }, {
        text: 'Descargar PDF con turnos',
        icon: 'document-text',
        handler: () => {
          this.createPdf();
        }
      },{
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
    });
    await actionSheet.present();
  }

  onEditFecha(){
    this.router.navigate([`/fechas/edit-fecha/${this.fechaActual.id}`]);
  }
  
  async turnoActionSheet(turno: Turno) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Acciones',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Eliminar Turno',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.onDeleteTurno(turno.id);
        }
      }, {
        text: 'Sesion realizada',
        icon: 'checkmark',
        handler: () => {
          let nombreYApellidoDelTurno = turno.nombre.split(" ");
          this.clientService.increaseOneClientSesion(nombreYApellidoDelTurno[0],nombreYApellidoDelTurno[1]);
          turno.realizado = true;
          this.storageService.updateTurno(turno);
          this.toastController.create({
            color: 'dark',
            duration: 450,
            message: 'Sesion incrementada',
            position: 'top',
          }).then( toastEl => {
            toastEl.present()
          })
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
    });
    await actionSheet.present();
  }

  onAddTurno(){
    this.router.navigate([`/fechas/detail-fecha/${this.fechaActual.id}/new-turno`]);
  }

  onDeleteTurno(id: string){
    this.alertCtrl.create({
      header: 'Eliminar Turno',
      message: '¿Seguro que desea eliminar el turno?',
      buttons: [
        {
          text: 'Eliminar',
          handler: () => {
            this.turnoService.deleteTurno(id).subscribe();
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
            return;
          }
        }
      ]
    }).then( alertEl => {
      alertEl.present();
    });
    
  }

  onDeleteFecha(id: string) {
    this.alertCtrl.create({
      header: 'Eliminar Fecha',
      message: '¿Seguro que desea eliminar la fecha?',
      buttons: [
        {
          text: 'Eliminar',
          handler: () => {
            this.fechaService.deleteFecha(id).subscribe();
            this.router.navigate(["/fechas"]);
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
            return;
          }
        }
      ]
    }).then( alertEl => {
      alertEl.present();
    });
  }

  ngOnDestroy() {
    if (this.fechaSub) {
      this.fechaSub.unsubscribe();
    }
    if(this.turnoSub){
      this.turnoSub.unsubscribe();
    }
  }
}
