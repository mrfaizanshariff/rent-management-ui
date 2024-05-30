import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPropertyDialogComponent } from '../../add-property-dialog/add-property-dialog.component';
import { AddTenantDialogComponent } from '../../add-tenant-dialog/add-tenant-dialog.component';
import { MessageBusService } from 'src/app/shared/services/message-bus.service';
import { FirmData } from 'src/app/models/FirmData';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { Tenant } from 'src/app/models/Tenant';

@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.scss']
})
export class DataEntryComponent implements OnInit {
  firmData!:FirmData
  panelData:any
  editFlag:boolean = false
  editDataFormGroup!:FormGroup<any>
  constructor(private dialog:MatDialog,
              private messageBusService:MessageBusService,
              private authService:AuthServiceService,
              private fb:FormBuilder ) { }

  ngOnInit(): void {
    this.editDataFormGroup = this.fb.group({
      rentAmount:['', Validators.required],
      rentDueDate:['', Validators.required],
      rentStartDate:['', Validators.required],
      phoneNumber:['', Validators.required],
    })
    console.log("DataEntryComponent")
    this.messageBusService.getFirmDatabase().subscribe(data => {
      this.firmData=data
      console.log(data)
    });
  }
  addProperty(){
    this.dialog.open(AddPropertyDialogComponent,{
      data: this.firmData,
      minWidth: '500px',
      maxWidth: '600px',
    })
  }
  addTenant(){
    this.dialog.open(AddTenantDialogComponent,{
      data: this.firmData,
      minWidth: '500px',
      maxWidth: '600px',
    })
  }


}