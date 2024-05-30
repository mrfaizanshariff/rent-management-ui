import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Auth, GoogleAuthProvider,UserCredential,user } from '@angular/fire/auth';
import { Observable, catchError, from,of, switchMap } from 'rxjs';
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
 getFirmData(firmId:string):Observable<any>{
  return from(this.fireStore.collection('firmDatabase',ref=>ref.where('firmId','==',firmId)).get())
 }
 updateFirmDatabase(firmId: string, newData: any, fieldToBeUpdated: string): Observable<void> {
  const firmDocRef: AngularFirestoreDocument = this.fireStore.doc(`firmDatabase/${firmId}`);

  return firmDocRef.get().pipe(
    switchMap(doc => {
      if (doc.exists) {
        const currentData = doc.data()!;
        let updateOperation: Promise<void>;

        switch (fieldToBeUpdated) {
          case 'userDatabase':
            const currentUserDatabase = currentData['userDatabase'] || [];
            const updatedUserDatabase = [...currentUserDatabase, newData];
            updateOperation = firmDocRef.update({ userDatabase: updatedUserDatabase });
            break;

          case 'userList':
            const currentUserList = currentData['userList'] || [];
            const updatedUserList = [...currentUserList, newData];
            updateOperation = firmDocRef.update({ userList: updatedUserList });
            break;

          case 'propertyDatabase':
            const currentPropertyDatabase = currentData['propertyDatabase'] || [];
            const updatedPropertyDatabase = [...currentPropertyDatabase, newData];
            updateOperation = firmDocRef.update({ propertyDatabase: updatedPropertyDatabase });
            break;

          case 'tenantDatabase':
            const currentTenantDatabase = currentData['tenantDatabase'] || [];
            const updatedTenantDatabase = [...currentTenantDatabase, newData];
            updateOperation = firmDocRef.update({ tenantDatabase: updatedTenantDatabase });
            break;

          case 'editTenantDatabase':
            const currentEditTenantDatabase = currentData['tenantDatabase'] || [];
            currentEditTenantDatabase.forEach((tenant: any, index: number) => {
              if (tenant.tenantId === newData?.tenantId) {
                currentEditTenantDatabase[index] = newData;
              }
            });
            updateOperation = firmDocRef.update({ tenantDatabase: currentEditTenantDatabase });
            break;

          default:
            return of(void 0);
        }

        return from(updateOperation);
      } else {
        return of(void 0);
      }
    }),
    catchError(error => {
      console.error('Error in updateFirmDatabase:', error);
      return of(void 0);
    })
  );
}
 

 getCurrentUser(){
  return from(this.afAuth.currentUser.then(res=>res))
 }
}
