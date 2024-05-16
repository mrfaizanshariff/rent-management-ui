import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Auth, GoogleAuthProvider,user } from '@angular/fire/auth';
import { Observable, from,of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  constructor(private afAuth: AngularFireAuth, private fireStore:AngularFirestore) {  }


 async loginWithGoogle(){
  return await this.afAuth.signInWithPopup(new GoogleAuthProvider())
  .then(response=>{
    console.log(response)
  }).catch((e)=>{console.log(e)})
 }

 getAllData():Observable<any>{
 return from(this.fireStore.collection('firmDatabase').get())
 }

 setInitialData():Observable<any>{
  return from(this.fireStore.collection('firmDatabase').add({
    
  }))
 }

 getCurrentUser(){
  return from(this.afAuth.currentUser.then(res=>res))
 }
}
