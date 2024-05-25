import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Auth, GoogleAuthProvider,UserCredential,user } from '@angular/fire/auth';
import { Observable, catchError, from,of } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  constructor(private afAuth: AngularFireAuth, private fireStore:AngularFirestore) {  }


  loginWithGoogle():Observable<any> {
   return from(this.afAuth.signInWithPopup(new GoogleAuthProvider())).pipe(
    catchError(function e(error):Observable<UserCredential>{
      return error
    })
   )
   
  }
  onAuthChange(){
   return from( this.afAuth.onAuthStateChanged(user=>console.log(user)))
  }
 logout():Observable<any>{
  return from(this.afAuth.signOut().then()).pipe(
    catchError(function e(error):Observable<any>{
     return error
    })
  )
 }
 getAllData():Observable<any>{
 return from(this.fireStore.collection('firmDatabase').get())
 }

 setInitialData(firmData:any,firmIds:any){
  this.fireStore.collection('firmDatabase')
  .doc(firmData?.firmId)
  .set(firmData)
  .then()
  .catch((err)=>{
    console.log(err)
  });
  this.fireStore.collection('firmIds')
  .doc().set({firmId:firmIds})
  .then()
  .catch((err)=>{console.log(err)});
 }

 getAllFirmIds(firmId:string):Observable<any>{
  return from(this.fireStore.collection('firmIds',ref=>ref.where('firmId','==',firmId)).get())
 }
 updateFirmDatabase(firmId:string,newData:any,fieldTobeUpdated:any){
  //get the document reference
  const firmDocRef: AngularFirestoreDocument =  this.fireStore.doc(`firmDatabase/${firmId}`);
  //getting the current doc data
  firmDocRef.get().subscribe({
    next:(doc)=>{
      if(doc.exists){
        const currentData = doc.data()!;
        //Based on the field name given will update thata particular field
        switch (fieldTobeUpdated) {
          case 'userDatabase':
            const currentUserDatabase = currentData['userDatabase'] || [];
            const updatedUserDatabase = [...currentUserDatabase, newData];
            firmDocRef.update({ userDatabase: updatedUserDatabase })
            .then(() => {
            console.log('User database updated successfully');
            })
            .catch(error => {
            console.error('Error updating user database:', error);
            });
            break;
          case 'userList':
            const currentUserList = currentData['userList'] || [];
            const updatedUserList = [...currentUserList, newData];
            firmDocRef.update({ userList: updatedUserList })
            .then(()=>{
              console.log('Updated user list successfully');
            })
            .catch(error=>{
              console.log('Error updating user list: ', error);
            })
            break;
          case 'propertyDatabase':
            const currentPropertyDatabase = currentData['propertyDatabase'] || [];
            const updatedPropertyDatabase = [...currentPropertyDatabase, newData];
            firmDocRef.update({ propertyDatabase: updatedPropertyDatabase})
            .then(()=>{
              console.log("Property database successfully updated");
            })
            .catch(error=>{
              console.log('Error updating property database: ', error);
            });
        }
        
      }
    }
  })
 }
 

 getCurrentUser(){
  return from(this.afAuth.currentUser.then(res=>res))
 }
}
