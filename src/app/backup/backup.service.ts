import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import "@codetrix-studio/capacitor-google-auth";
import { Plugins } from "@capacitor/core";
import * as firebase from "firebase";
import { GooglePlus } from "@ionic-native/google-plus";
import { ClientesService } from "../clientes/clientes.service";
import { Cliente } from "../clientes/clientes.model";
import { map } from 'rxjs/operators';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: "root",
})
export class BackupService {
  currentUser = null;
  
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private storageClient: StorageService
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
    
  }

  downloadBackup() {}
}
