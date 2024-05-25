import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/User';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { RegisterComponentComponent } from '../auth/register-component/register-component.component';
import { Router } from '@angular/router';
import { MessageBusService } from 'src/app/shared/services/message-bus.service';
import { FirmData } from 'src/app/models/FirmData';
import { LoginComponentComponent } from '../auth/login-component/login-component.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit,AfterViewInit {
  currentUser: User = {
    userName: '',
    email: '',
    role: '',
    uid: '',
    userCreatedTime:new Date() ,
    photoUrl: ''
  };
  firmData!:FirmData
  buttonList:any = ["Overview","Generate Invoice"]
  pageName:string ='overview'
  constructor(private authService:AuthServiceService,
     private dialogRef:MatDialog,
    private router:Router,
    private messageBusService:MessageBusService) {
      messageBusService.getFirmDatabase().subscribe({
        next:(response:any)=>{
          this.firmData = response
        }
      })
     }
  ngAfterViewInit(): void {
    // this.checkAdmin() ? this.buttonList.push("Enter Data"): null
  }

  ngOnInit(): void {
    this.getCurrentUser()
    this.getAllDataFromFirbase()
    if(this.pageName=='overview'){
      this.router.navigate(['/dashboard/overview']);
    }
  }

//gets the current user from the database
 getCurrentUser(){
  this.authService.getCurrentUser().subscribe({
    next:(user:any)=>{
      if(user){
        this.initializeCurrentUser(user)
      }else{
        //TODO give the google sign in popup when the user refresh the dashboard page
        // this.router.navigate([''])
      }
      
    }
  }) 
 }

 // gets all data from the database
 getAllDataFromFirbase(){
  this.authService.getAllData().subscribe({
    next:(data)=>{
      if(data.empty){
        //call the registration dialog
        this.dialogRef.open(
          RegisterComponentComponent,{
            data: this.currentUser,
            disableClose:true,
            panelClass:'register-dialog-container'
          }
        )
      }else{
       let userBelongsToFirm = false
       let firmId = ''
       let firmIndex:number = 0
       let setAsAdmin = false
      
       data?.docs?.forEach((firm:any,index:number)=>{
        //check if user belongs to any firm or not
        console.log(firm.data())
        if(firm?.data()?.adminList?.includes(this.currentUser.email) || 
           firm?.data()?.userList?.includes(this.currentUser.email)){
          userBelongsToFirm = true;
          firmId = firm?.firmId;
          firmIndex = index;

        }
       })
       if(userBelongsToFirm){
        // set the firmDatabase subject
        this.firmData = data?.docs[firmIndex].data()
        this.messageBusService.setFirmdatabase(data?.docs[firmIndex].data())
       }else{
        // When a new user logs in. might be a employee or a new firm owner.
        if(this.currentUser.email)
        this.dialogRef.open(
          LoginComponentComponent,{
            data: {
              currentUser:this.currentUser,
              allFirmData:data?.docs
            },
            disableClose:true,
            panelClass: 'login-dialog-container'
          }
        )
       }
       this.checkAdmin()
      }
    }
  })
 }

  //Getting the current user from the observable and initializing the variable
  initializeCurrentUser(user:any){
          this.currentUser.userName = user?.multiFactor?.user.displayName
          this.currentUser.email = user?.multiFactor?.user.email
          this.currentUser.photoUrl = user?.multiFactor?.user.photoURL
          this.currentUser.uid = user?.multiFactor?.user.uid
          this.currentUser.userCreatedTime = new Date(user?.multiFactor.user.metadata.creationTime)
          this.messageBusService.setCurrentUser(this.currentUser)          
        }

  checkAdmin(){
    if(this.firmData?.adminList.some(a=>a==this.currentUser.email)){
      this.currentUser.role == 'admin';
      this.messageBusService.setCurrentUser(this.currentUser)
      this.buttonList.push("Enter Data")
      return true;
    }else{
      return false;
    }
  }

  pageNavigation(flag:string){
    if(flag.toLowerCase()=="generate invoice"){
      this.pageName = flag.toLowerCase();
      this.router.navigate(['/dashboard/invoice']);

    }else if(flag.toLowerCase()=="overview"){
      this.pageName = flag.toLowerCase();
      this.router.navigate(['/dashboard/overview']);

    }else if(flag.toLowerCase()=="profile"){
      this.pageName = flag.toLowerCase();
    }else if(flag.toLowerCase()=="enter data"){
      this.pageName = flag.toLowerCase();
      this.router.navigate(['/dashboard/dataentry']);

    }
  }
}
