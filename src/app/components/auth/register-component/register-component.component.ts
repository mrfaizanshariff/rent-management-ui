import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FirmData } from 'src/app/models/FirmData';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { MessageBusService } from 'src/app/shared/services/message-bus.service';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.scss']
})
export class RegisterComponentComponent implements OnInit {
  registrationForm!: FormGroup<any>;

  constructor(private formBuilder: FormBuilder,
     private authService:AuthServiceService,
     private router:Router,
     private messageBusService:MessageBusService,
     private dialogRef:MatDialogRef<RegisterComponentComponent>,
     @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      firmName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
  });

}
  createFirm(){
    if(this.registrationForm.valid &&
      this.registrationForm.controls['firmName'].value &&
      this.registrationForm.controls['email'].value
    ){
      this.setFirmDataInDatabase()
    }
    this.dialogRef.close()
  }
  setFirmDataInDatabase(){
    let initialData:FirmData 
        initialData = {...this.registrationForm.value}
        initialData.firmId = initialData['email']
        initialData['userDatabase']= [this.data]
        initialData['adminList'] = [this.data.email]
        console.log(initialData)
        this.authService.setInitialData(initialData,initialData.firmId)
        this.messageBusService.setFirmdatabase(initialData)

  }
  
  onCheckbox(event:any){
    if(event?.checked){
      if(event?.source?.name == 'name'){
        this.registrationForm.controls['firmName'].setValue(this.data?.userName)
      }else{
        this.registrationForm.controls['email'].setValue(this.data?.email)

      }
    }else if(event?.checked == false){
      if(event?.source?.name == 'name'){
        this.registrationForm.controls['firmName'].reset()
      }else{
        this.registrationForm.controls['email'].reset()

      }
    }
  }
}
