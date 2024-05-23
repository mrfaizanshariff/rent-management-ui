import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { FirmData } from 'src/app/models/FirmData';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { MessageBusService } from 'src/app/shared/services/message-bus.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false; 
  firmData!:FirmData 
  constructor(private afAuth:AuthServiceService,
    private fireAuth:AngularFireAuth,
    private router:Router,
    private messageBusService:MessageBusService
  ) { 
    this.isLoggedInMethod();
    messageBusService.getFirmDatabase().subscribe({
      next:(res)=>{
        this.firmData = res;
      }
    })
  }

  ngOnInit(): void {
   
  }
  registerLoginButton(){
  this.afAuth.loginWithGoogle().subscribe({
    next:(res)=>{
      console.log(res)
      if(res)
      this.router.navigate(['/dashboard']);
    },
    error:(e)=>{
      console.log(e)
    }
  })
  }
  isLoggedInMethod(){
   this.fireAuth.onAuthStateChanged(user=>{
    this.isLoggedIn = !!user
   })
  }  
  logout(){
    this.afAuth.logout().subscribe({
      next:()=>{
        this.router.navigate(['']);
      }
    });
  }



}
