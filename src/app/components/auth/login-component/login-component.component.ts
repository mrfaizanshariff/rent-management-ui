import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { RegisterComponentComponent } from '../register-component/register-component.component';
import { MessageBusService } from 'src/app/shared/services/message-bus.service';
import { User } from 'src/app/models/User';
import { FirmData } from 'src/app/models/FirmData';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponentComponent implements OnInit {
  loginForm!:FormGroup<any>;
  isVerified: boolean = false;
  loader:boolean = false;
  currentUser!:User
  allFirmData: any;
  constructor(private fb:FormBuilder,
              private authService:AuthServiceService,
              private dialogRef:MatDialog,
              private messageBusService:MessageBusService,
              private selfDialogref:MatDialogRef<LoginComponentComponent>,
            @Inject(MAT_DIALOG_DATA) public data:any) {
              this.currentUser = data?.currentUser;
              this.allFirmData = data?.allFirmData.map((e:any)=>e.data());
              console.log(this.allFirmData)
             }
  

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      firmId :['',Validators.required]
    })
   
  }
  
  verifyFirmId(){
    if(this.loginForm.valid){
      this.loader = true
      const userInputfirmId = this.loginForm.controls['firmId']?.value 
      this.authService.getAllFirmIds(userInputfirmId).subscribe({
        //this menthod will mostly return a single firmID, but need to find an edge case where it doesn't exist
        next:(firmId)=>{
          this.loader=false
          if(firmId?.docs[0]?.data()){
            // firmId?.docs.forEach((doc:any)=>{
            //   console.log(doc.data())
            // })
            this.isVerified=true 
          }else{
            this.isVerified=false
          }
          // firmId ? this.isVerified=true : this.isVerified = false;
          !this.isVerified ? this.loginForm.setErrors({'notVerified':true}) : this.loginForm.setErrors(null)
        },
        error:(err)=>{
          this.loader=false;
          this.isVerified = false;
          console.log(err)
        }
      })
    }else{
      this.loginForm.setErrors({'invalid':true})
    }
  }

  createFirm(){
    this.dialogRef.open(
      RegisterComponentComponent,{
        data: this.currentUser,
        disableClose:true
      }
    )
    this.selfDialogref.close()
  }

  login(){
    if(this.isVerified){
      const firmId = this.loginForm.controls['firmId']?.value 
      const firmData = this.allFirmData.filter((firm:any)=>firm.firmId == firmId)[0]
      firmData['userDatabase'].push(this.currentUser);
      if(!firmData['userList']){
        //checking if the user list exist or not
        firmData['userList'] = []
      }
      firmData['userList'].push(this.currentUser.email)
      this.messageBusService.setFirmdatabase(firmData);
      this.authService.updateFirmDatabase(firmId,this.currentUser.email,'userList').subscribe()
      this.authService.updateFirmDatabase(firmId,this.currentUser,'userDatabase').subscribe()
      this.selfDialogref.close()
    }
  }


}
