import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FirmData } from 'src/app/models/FirmData';
import { Property } from 'src/app/models/Property';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { MessageBusService } from 'src/app/shared/services/message-bus.service';

@Component({
  selector: 'app-add-property-dialog',
  templateUrl: './add-property-dialog.component.html',
  styleUrls: ['./add-property-dialog.component.scss']
})
export class AddPropertyDialogComponent implements OnInit {
  propForm!:FormGroup;
  propDataBase:any={};
  firmData!:FirmData
  constructor(private fb:FormBuilder,
              private messageBusService:MessageBusService,
              private authService:AuthServiceService,
              private dialogRef:MatDialogRef<AddPropertyDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data:FirmData
            ) {  }

  ngOnInit(): void {
    this.propForm = this.fb.group({
      propName:['', Validators.required]
    })
    this.firmData = this.data
    this.setPropDetails()
  }
  setPropDetails(){
      this.propDataBase['firmId'] = this.firmData.firmId
      if(this.firmData.propertyDatabase.length > 0){
        this.propDataBase['propertyId'] = `P${Number(this.firmData.propertyDatabase[this.firmData.propertyDatabase.length-1].propertyId.slice(1)+1)}`
      }else{
        this.propDataBase['propertyId'] ="P1"
      }
    }
  addProp(){
   
    if(this.propForm.valid && this.propDataBase.firmId){
      this.propDataBase.propertyName = this.propForm.controls['propName'].value
      this.firmData.propertyDatabase.push(this.propDataBase)
      this.messageBusService.setFirmdatabase(this.firmData)
      this.authService.updateFirmDatabase(this.propDataBase.firmId,this.propDataBase,'propertyDatabase')
      this.dialogRef.close()
    }
  }
}
