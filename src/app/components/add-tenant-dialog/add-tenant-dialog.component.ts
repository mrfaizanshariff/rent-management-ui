import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FirmData } from 'src/app/models/FirmData';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { MessageBusService } from 'src/app/shared/services/message-bus.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-tenant-dialog',
  templateUrl: './add-tenant-dialog.component.html',
  styleUrls: ['./add-tenant-dialog.component.scss']
})
export class AddTenantDialogComponent implements OnInit, OnDestroy {

  tenantForm!: FormGroup;
  tenantDatabase: any = {};
  properties: any[] = [];
  propDatabase: any;
  firmData!: FirmData;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private messageBusService: MessageBusService,
    private authService: AuthServiceService,
    private dialogRef: MatDialogRef<AddTenantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FirmData
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.firmData = this.data;
    this.setTenantDetails();
    this.getProperties();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private initializeForm(): void {
    this.tenantForm = this.fb.group({
      tenantName: ['', Validators.required],
      propName: ['', Validators.required],
      tenantNumber: ['', Validators.required],
      rentAmount: ['', Validators.required],
      rentStartDate: ['', Validators.required],
      rentDueDate: ['', Validators.required]
    });
  }

  private setTenantDetails(): void {
    // this.tenantDatabase['firmId'] = this.firmData.firmId;
    this.tenantDatabase['propertyId'] = this.propDatabase?.propertyId;
    if (this.firmData.tenantDatabase.length > 0) {
      this.tenantDatabase['tenantId'] = `T${Number(this.firmData.tenantDatabase[this.firmData.tenantDatabase.length-1].tenantId.slice(1)+1)}`;
    }else{  
      this.tenantDatabase['tenantId'] = 'T1'
    }
    console.log(this.tenantDatabase);
  }

  private getProperties(): void {
    this.properties = [...this.firmData?.propertyDatabase];
    console.log(this.properties);
  }

  addTenant(): void {
    if (this.tenantForm.valid) {
      this.tenantDatabase.tenantName = this.tenantForm.controls['tenantName'].value;
      this.tenantDatabase.phone = this.tenantForm.controls['tenantNumber'].value;
      this.tenantDatabase.rentAmount = this.tenantForm.controls['rentAmount'].value;
      this.tenantDatabase.rentStartDate = this.tenantForm.controls['rentStartDate'].value;
      this.tenantDatabase.rentDueDate = this.tenantForm.controls['rentDueDate'].value;
      
      this.firmData.tenantDatabase.push(this.tenantDatabase);
      console.log(this.tenantDatabase);

      this.messageBusService.setFirmdatabase(this.firmData);
      this.authService.updateFirmDatabase(this.firmData.firmId, this.tenantDatabase, 'tenantDatabase')
      this.dialogRef.close();

    }
  }

  onPropSelect(event: any): void {
    this.propDatabase = event.value;
    this.setTenantDetails();
  }
}
