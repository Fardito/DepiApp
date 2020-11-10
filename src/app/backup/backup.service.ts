import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import '@codetrix-studio/capacitor-google-auth';
import { Plugins } from '@capacitor/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class BackupService {

  currentUser = null;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.afAuth.onAuthStateChanged(user => {
      this.currentUser = user;
    });
   }

   async signUpWithGoogle(){
    const googleUser = await Plugins.GoogleAuth.signIn(null);
    this.currentUser = googleUser;
    return this.afAuth.signInWithCredential(firebase.default.auth.GoogleAuthProvider.credential(null, this.currentUser.authentication.accessToken));
   }

   signIn(){
   }

   singOut(){
     return this.afAuth.signOut();
   }
}
