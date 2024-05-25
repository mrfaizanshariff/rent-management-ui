import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { User } from "src/app/models/User";
import { FirmData } from "src/app/models/FirmData";

@Injectable({
    providedIn: 'root'
  })
  export class MessageBusService {
   
    currentUserSubject = new BehaviorSubject<any>({})
    firmDatabase = new BehaviorSubject<any>({})
    
    constructor (){}

    currentUser$ = this.currentUserSubject.asObservable(); 
    getCurrentUser():Observable<User>{
        return this.currentUserSubject.asObservable();
    }
    setCurrentUser(user:User){
        if(user)
        this.currentUserSubject.next(user);
    }    

    firmDatabaseObservable$ = this.firmDatabase.asObservable();
    getFirmDatabase():Observable<FirmData>{
        return this.firmDatabase.asObservable();
    }
    setFirmdatabase(data:FirmData) {
        if(data)
        this.firmDatabase.next(data)
    console.log(data)
    
    }
  }