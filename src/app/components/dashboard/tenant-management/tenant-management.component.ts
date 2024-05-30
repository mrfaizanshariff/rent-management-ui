import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { concatMap } from 'rxjs';
import { FirmData } from 'src/app/models/FirmData';
import { Tenant } from 'src/app/models/Tenant';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { MessageBusService } from 'src/app/shared/services/message-bus.service';

@Component({
  selector: 'app-tenant-management',
  templateUrl: './tenant-management.component.html',
  styleUrls: ['./tenant-management.component.scss']
})
export class TenantManagementComponent implements OnInit {

  firmData!:FirmData
  panelData:any
  rentamntFlag:boolean=false
  rentduedateFlag:boolean=false
  phonenumberFlag:boolean=false
  registrationdateFlag:boolean=false
  rentAmount=new FormControl('',Validators.required)
  rentDueDate=new FormControl( '',Validators.required)
  rentStartDate=new FormControl('', Validators.required)
  phoneNumber=new FormControl('',Validators.required)
  constructor(private messageBusService:MessageBusService,
              private authService:AuthServiceService,
              private cd: ChangeDetectorRef ) { }

  ngOnInit(): void {
   
   

    console.log("DataEntryComponent")
    this.messageBusService.getFirmDatabase().subscribe(data => {
      this.firmData=data
      this.setAccordionData()
      console.log(data)
    });
  }


private setAccordionData() {
  const tData = this.firmData.tenantDatabase
  const propData = this.firmData.propertyDatabase
  tData.forEach((e:any)=> {
    e['propertyName'] =  propData.filter(p=>p.propertyId == e.propertyId)[0].propertyName
   })
  this.panelData = [...tData]
  this.cd.detectChanges()
  console.log(this.panelData)
}

 formatTimeStampToDate(timeStamp:any){
    
  const milliseconds = timeStamp?.seconds * 1000 + Math.floor(timeStamp?.nanoseconds / 1e6);
  if (milliseconds) {
    const date = new Date(milliseconds);
    const options = { timeZone: 'Asia/Kolkata' }; // Adjust timezone as per your requirement
    return date.toLocaleDateString('en-GB', options);
  } else {
    // Handle case when milliseconds are not present
    return new Date(timeStamp)?.toLocaleDateString('en-GB', { timeZone: 'Asia/Kolkata' });
  }

  }
  editTenantData(flag:string){
    if(flag === 'rentamnt'){
      this.rentamntFlag = !this.rentamntFlag;
      !this.rentamntFlag ? this.rentAmount.reset() : null
      
    }else if(flag === 'rentduedate'){
      this.rentduedateFlag = !this.rentduedateFlag
      !this.rentduedateFlag ? this.rentDueDate.reset() : null

    }else if(flag==='registrationdate'){
      this.registrationdateFlag = !this.registrationdateFlag
      !this.registrationdateFlag ? this.rentAmount.reset() : null

    }else if(flag==='phonenumber'){
      this.phonenumberFlag = !this.phonenumberFlag
      !this.phonenumberFlag ? this.phoneNumber.reset() : null

    }
  }
  updateTenantDetails(tenant:any){
    if(
      (this.rentStartDate.valid && this.rentStartDate.value) ||
      (this.rentDueDate.valid && this.rentDueDate.value)||
      (this.rentAmount.valid && this.rentAmount.value)||
      (this.phoneNumber.valid && this.phoneNumber.value)
    ){
    const newData :Tenant= {
      tenantId : tenant.tenantId,
      tenantName: tenant.tenantName,
      rentStartDate:this.rentStartDate?.value ? this.rentStartDate.value : tenant.rentStartDate,
      rentDueDate: this.rentDueDate?.value ? this.rentDueDate.value : tenant.rentDueDate,
      rentAmount:this.rentAmount.value ? this.rentAmount.value : tenant.rentAmount,
      propertyId:tenant.propertyId,
      phone:this.phoneNumber.value ? this.phoneNumber.value : tenant.phone
    }
    console.log(tenant,newData)
    this.authService.updateFirmDatabase(this.firmData.firmId,newData,'editTenantDatabase').pipe(
      concatMap(()=>this.authService.getFirmData(this.firmData.firmId))
    ).subscribe({
      next:(data)=>{
        console.log(data.docs[0]?.data())
        this.firmData = data.docs[0]?.data()
        this.messageBusService.setFirmdatabase(this.firmData)
        this.resetFormValues();
        this.resetEditFlags();
      },
      error:()=>{
        this.resetFormValues();
        this.resetEditFlags();},
    })
  }
}
resetEditFlags() {
  this.rentamntFlag = false;
  this.rentduedateFlag = false;
  this.registrationdateFlag = false;
  this.phonenumberFlag = false;
}
 resetFormValues(){
  this.rentStartDate.reset();
  this.rentDueDate.reset();
  this.rentAmount.reset();
  this.phoneNumber.reset();
 }
}


