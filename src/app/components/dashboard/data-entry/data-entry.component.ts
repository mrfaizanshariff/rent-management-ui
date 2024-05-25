import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPropertyDialogComponent } from '../../add-property-dialog/add-property-dialog.component';
import { AddTenantDialogComponent } from '../../add-tenant-dialog/add-tenant-dialog.component';
import { MessageBusService } from 'src/app/shared/services/message-bus.service';
import { FirmData } from 'src/app/models/FirmData';

@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.scss']
})
export class DataEntryComponent implements OnInit {
  firmData!:FirmData

  constructor(private dialog:MatDialog,
              private messageBusService:MessageBusService
  ) { }

  ngOnInit(): void {
    console.log("DataEntryComponent")
    this.messageBusService.getFirmDatabase().subscribe(data => {
      this.firmData=data
      console.log(data)
    });
  }
  addProperty(){
    this.dialog.open(AddPropertyDialogComponent,{
      data: this.firmData
    })
  }
  addTenant(){
    this.dialog.open(AddTenantDialogComponent)
  }
}
