import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import "@codetrix-studio/capacitor-google-auth";
import { Plugins } from "@capacitor/core";
import * as firebase from "firebase";
import { ClientesService } from "../clientes/clientes.service";
import { Cliente } from "../clientes/clientes.model";
import { StorageService } from "../storage.service";

@Injectable({
  providedIn: "root",
})
export class BackupService {
  currentUser = null;

  ArrayClient: Cliente[] = [];

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private clientService: ClientesService,
    private storageService: StorageService
  ) {
    this.afAuth.onAuthStateChanged((user) => {
      this.currentUser = user;
    });
  }

  async signUpWithGoogle() {
    this.currentUser = await Plugins.GoogleAuth.signIn(null);
    return this.afAuth.signInWithCredential(
      firebase.default.auth.GoogleAuthProvider.credential(
        this.currentUser.authentication.idToken,
        this.currentUser.authentication.accessToken
      )
    );
  }

  singOut() {
    this.currentUser = null;
    return this.afAuth.signOut();
  }

  storeBackup() {

    this.clientService.clientes.subscribe((clientes) => {
      clientes.forEach((cliente) => {
        this.afs
          .collection("users")
          .doc(this.currentUser.uid)
          .collection("clientes")
          .doc(cliente.id)
          .set({
            firstName: cliente.firstName,
            lastName: cliente.lastName,
            phone: cliente.celPhone,
            id: cliente.id,
            sesiones: cliente.sesiones,
          });
      });
    });

  }

  async downloadBackup() {

    const doc = this.afs
      .collection("users")
      .doc(this.currentUser.uid)
      .collection("clientes");

    const anotherDoc = doc.get();
    await anotherDoc.forEach( (x) => {
      x.forEach( async (y) => {
        this.ArrayClient.push(new Cliente(y.data().id,y.data().firstName,y.data().lastName,y.data().phone,y.data().sesiones));
      });
    });
/*
    this.ArrayClient.forEach(async (cliente) => {
      await this.storageService.addClient(new Cliente(cliente.id, cliente.firstName, cliente.lastName, cliente.celPhone, cliente.sesiones));
      this.clientService.addClient(cliente.id, cliente.firstName, cliente.lastName, cliente.celPhone, cliente.sesiones);
    })
*/
    
    for (let index = 0; index < this.ArrayClient.length; index++) {
      if(this.clientService.addClient(this.ArrayClient[index].id,this.ArrayClient[index].firstName,this.ArrayClient[index].lastName,this.ArrayClient[index].celPhone,this.ArrayClient[index].sesiones)){
        await this.storageService.addClient(new Cliente(this.ArrayClient[index].id,this.ArrayClient[index].firstName,this.ArrayClient[index].lastName,this.ArrayClient[index].celPhone,this.ArrayClient[index].sesiones));
      } 
    }
    
    
  }
}
