import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/User';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { RegisterComponentComponent } from '../auth/register-component/register-component.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentUser: User = {
    userName: '',
    email: '',
    role: '',
    uid: '',
    userCreatedTime:new Date() ,
    photoUrl: ''
  };
  constructor(private authService:AuthServiceService,
     private dialogRef:MatDialog,
    private router:Router) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe({
      next:(user:any)=>{
        if(user){
          this.currentUser.userName = user?.multiFactor?.user.displayName
          this.currentUser.email = user?.multiFactor?.user.email
          this.currentUser.photoUrl = user?.multiFactor?.user.photoURL
          this.currentUser.uid = user?.multiFactor?.user.uid
          this.currentUser.userCreatedTime = new Date(user?.multiFactor.user.metadata.creationTime)
          console.log(this.currentUser)
        }else{
          this.router.navigate([''])
        }
        
      }
    })
    this.authService.getAllData().subscribe({
      next:(data)=>{console.log(data,data.empty)
        if(data.empty){
          //call the registration dialog
          this.dialogRef.open(
            RegisterComponentComponent,{
              data: this.currentUser
            }
          )
        }else{

        }
      }
    })
  }

}
